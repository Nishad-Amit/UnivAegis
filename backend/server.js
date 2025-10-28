const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Enable CORS for frontend communication
app.use(cors());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nishadamit19_db_user:yZkOt4I3AXOizlMe@cluster0.3shak4p.mongodb.net/UnivAegis?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

// Define the admission schema
const admissionSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  age: { type: Number, required: true, min: 16 },
  address: { type: String, required: true },
  gre_gmat_score: String,
  selected_course: { type: String, required: true },
  documents: [{ 
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    gridfsId: mongoose.Types.ObjectId
  }], // Array of document metadata
  submitted_at: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  eligibility_score: Number
}, {
  collection: 'Admission Form Details'
});

const Admission = mongoose.model('Admission', admissionSchema);

// Configure multer for file handling (we'll handle GridFS storage separately)
const storage = multer.memoryStorage(); // Store in memory temporarily
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'));
    }
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Admission API is running' });
});

// API endpoint for admission form submission
app.post('/api/admission-form', upload.array('documents', 5), async (req, res) => {
  try {
    const { 
      full_name, 
      age, 
      address, 
      gre_gmat_score, 
      selected_course
    } = req.body;

    // Validation
    if (!full_name || full_name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please enter your full name'
      });
    }

    if (!age || age < 16) {
      return res.status(400).json({
        success: false,
        message: 'Age must be at least 16'
      });
    }

    if (!address || address.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please enter your address'
      });
    }

    if (!selected_course || selected_course.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please select a course'
      });
    }

    // Initialize GridFS bucket
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'student_docs' });

    // Store documents in GridFS
    const documents = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Create a unique filename
        const filename = `${full_name.replace(/\s+/g, '_')}_${Date.now()}_${file.originalname}`;
        
        // Store file in GridFS
        const uploadStream = bucket.openUploadStream(filename, {
          contentType: file.mimetype
        });
        
        // Store the file buffer
        uploadStream.end(file.buffer);
        
        // Wait for the upload to complete
        await new Promise((resolve, reject) => {
          uploadStream.on('finish', resolve);
          uploadStream.on('error', reject);
        });
        
        // Store document metadata
        documents.push({
          filename: filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          gridfsId: uploadStream.id
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Upload at least one document'
      });
    }

    // Create new admission record
    const admission = new Admission({
      full_name,
      age: parseInt(age),
      address,
      gre_gmat_score,
      selected_course,
      documents,
      status: 'Pending'
    });

    // Save to MongoDB
    await admission.save();

    res.status(201).json({
      success: true,
      message: 'Admission form submitted successfully',
      data: admission
    });
  } catch (error) {
    console.error('Error saving admission form:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting admission form',
      error: error.message
    });
  }
});

// Get all admissions (for admin dashboard)
app.get('/api/admissions', async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ submitted_at: -1 });
    res.status(200).json({
      success: true,
      data: admissions
    });
  } catch (error) {
    console.error('Error fetching admissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admissions',
      error: error.message
    });
  }
});

// Get admission by ID
app.get('/api/admissions/:id', async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }
    res.status(200).json({
      success: true,
      data: admission
    });
  } catch (error) {
    console.error('Error fetching admission:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admission',
      error: error.message
    });
  }
});

// Endpoint to retrieve a document from GridFS
app.get('/api/documents/:id', async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'student_docs' });
    
    // Find the file by its GridFS ID
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    
    // Check if file exists
    const files = await bucket.find({ _id: fileId }).toArray();
    if (files.length === 0) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    
    const file = files[0];
    
    // Set the content type
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', `inline; filename="${file.filename}"`);
    
    // Stream the file to the response
    bucket.openDownloadStream(fileId).pipe(res);
  } catch (error) {
    console.error('Error retrieving document:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving document',
      error: error.message
    });
  }
});

// Endpoint for demo requests
app.post('/api/demo-requests', async (req, res) => {
  try {
    const { firstName, lastName, email, university } = req.body;
    
    // Simple validation
    if (!firstName || !lastName || !email || !university) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    // In a real application, you would save this to a database
    // For now, we'll just log it and return success
    console.log('Demo request received:', { firstName, lastName, email, university });
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'Demo request submitted successfully',
      id: Date.now().toString() // Simple ID generation
    });
  } catch (error) {
    console.error('Error processing demo request:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting demo request',
      error: error.message
    });
  }
});

// Endpoint for contact messages
app.post('/api/contact-messages', async (req, res) => {
  try {
    const { name, email, university, message } = req.body;
    
    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }
    
    // In a real application, you would save this to a database
    // For now, we'll just log it and return success
    console.log('Contact message received:', { name, email, university, message });
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'Contact message submitted successfully',
      id: Date.now().toString() // Simple ID generation
    });
  } catch (error) {
    console.error('Error processing contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact message',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB connected to UnivAegis database`);
});