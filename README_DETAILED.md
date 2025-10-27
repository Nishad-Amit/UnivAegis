# UnivAegis Admission Form System

Complete instructions to run the UnivAegis Admission Form System on your local machine.

## Project Overview

This system allows students to submit admission inquiries with personal information and document uploads. The data is stored in MongoDB using GridFS for document storage.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git (optional, for cloning the repository)
- MongoDB Atlas account (using the provided credentials)

## Dependencies to Install

When running on another PC, you'll need to install the following dependencies:

### Frontend Dependencies
These are listed in the root `package.json` file:
```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^1.2.1",
    "cmdk": "^0.2.0",
    "date-fns": "^2.30.0",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.263.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-dropzone": "^14.2.3",
    "react-hook-form": "^7.45.4",
    "react-hot-toast": "^2.4.1",
    "react-router-dom": "^6.8.1",
    "recharts": "^2.7.2",
    "tailwind-merge": "^1.14.0",
    "vaul": "^0.7.9",
    "zustand": "^4.3.8"
  },
  "devDependencies": {
    "@types/node": "^24.9.1",
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
```

### Backend Dependencies
These are listed in `backend/package.json`:
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "multer": "^1.4.5-lts.1",
    "cors": "^2.8.5",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## Project Structure

```
UnivAegis/
├── src/                 # Frontend React application
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── store/           # Zustand store for state management
├── backend/             # Backend Node.js server
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
├── public/              # Static assets
├── package.json         # Frontend dependencies
└── README_DETAILED.md   # This file
```

## Setup Instructions

### 1. Frontend Setup

1. Open a terminal/command prompt in the project root directory
2. Install frontend dependencies:
   ```bash
   npm install
   ```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Return to the project root:
   ```bash
   cd ..
   ```

## Running the Application

### 1. Start the Backend Server

1. Open a terminal in the project root directory
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. The server will start on port 5001
5. You should see the message: "Server running on port 5001" and "MongoDB connected to UnivAegis database"

### 2. Start the Frontend Development Server

1. Open a new terminal in the project root directory
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The frontend will start on port 3000 (or next available port)
4. You should see a message like: "Local: http://localhost:3000/"

### 3. Access the Application

1. Open your web browser
2. Navigate to: http://localhost:3000
3. You should see the UnivAegis landing page
4. Click on "Register Yourself" to access the admission form

## MongoDB Configuration

The application is already configured to connect to your MongoDB Atlas database:

- **Connection String**: `mongodb+srv://nishadamit19_db_user:yZkOt4I3AXOizlMe@cluster0.3shak4p.mongodb.net/UnivAegis?retryWrites=true&w=majority`
- **Database Name**: UnivAegis
- **Collection Name**: Admission Form Details
- **GridFS Bucket**: student_docs

## Features

### Admission Form
- Collects student information (name, age, address, etc.)
- Course selection dropdown
- Document upload (PDF, JPEG, PNG)
- Form validation
- Submission to MongoDB

### Data Storage
- Text data stored in MongoDB collection
- Documents stored in MongoDB GridFS
- Automatic metadata tracking

### API Endpoints
- `POST /api/admission-form` - Submit admission form
- `GET /api/admissions` - Get all admissions
- `GET /api/admissions/:id` - Get specific admission
- `GET /api/documents/:id` - Retrieve document from GridFS
- `GET /api/health` - Health check

## Viewing Data in MongoDB Atlas

1. Go to https://cloud.mongodb.com/
2. Sign in with the credentials:
   - Username: nishadamit19_db_user
   - Password: yZkOt4I3AXOizlMe
3. Select your cluster
4. Browse the "UnivAegis" database
5. You'll see the following collections:
   - `Admission Form Details` - Form submissions
   - `student_docs.files` - Document metadata
   - `student_docs.chunks` - Document data chunks

## Troubleshooting

### Port Conflicts
If port 5001 is already in use:
1. Stop the running server (Ctrl+C)
2. Edit `backend/server.js` and change the PORT variable
3. Restart the server

### Connection Issues
If you have connection issues:
1. Check your internet connection
2. Verify MongoDB credentials are correct
3. Ensure MongoDB Atlas IP whitelist includes your IP address

### File Upload Issues
If document uploads fail:
1. Check file size (max 10MB)
2. Verify file type (PDF, JPEG, PNG only)
3. Check browser console for errors

## Development Notes

### Frontend
- Built with React 18, TypeScript, and Vite
- Uses Tailwind CSS for styling
- Responsive design for all device sizes

### Backend
- Node.js with Express framework
- Mongoose for MongoDB interaction
- Multer for file handling
- GridFS for document storage

### Security
- CORS enabled for frontend-backend communication
- File type validation
- File size limits

## Customization

### Adding New Fields
1. Update the admission schema in `backend/server.js`
2. Modify the form in `src/pages/AdmissionFormPage.tsx`
3. Update validation logic as needed

### Changing Document Storage
To use Cloudinary or AWS S3 instead of GridFS:
1. Install the appropriate SDK
2. Modify the document upload section in `backend/server.js`
3. Update the document retrieval endpoint

## Testing the System

1. Navigate to http://localhost:3000
2. Click "Register Yourself"
3. Fill out the admission form:
   - Enter full name
   - Select date of birth (must be at least 16 years old)
   - Enter address
   - Select a course
   - Upload at least one document (PDF, JPEG, or PNG)
4. Click "Submit Registration"
5. Check MongoDB Atlas to verify data was stored correctly

## Stopping the Application

1. In the frontend terminal: Press Ctrl+C
2. In the backend terminal: Press Ctrl+C

## Additional Resources

- MongoDB Atlas Dashboard: https://cloud.mongodb.com/
- React Documentation: https://reactjs.org/
- Express Documentation: https://expressjs.com/
- MongoDB Documentation: https://docs.mongodb.com/