# 🏥 PediaScan - AI-Powered Pediatric Assessment System

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Usage Instructions](#usage-instructions)
- [Component Documentation](#component-documentation)
- [API Documentation](#api-documentation)
- [Code Explanation](#code-explanation)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**PediaScan** is an AI-powered web application designed to assist healthcare providers and parents in assessing pediatric dehydration risk through cry pattern analysis and symptom evaluation. The system combines audio signal processing with clinical questionnaires to provide preliminary assessments.

### ⚠️ Medical Disclaimer
This tool is for informational purposes only and does NOT replace professional medical diagnosis. Always consult a qualified pediatrician for health concerns.

---

## ✨ Features

### Core Functionality
- 👶 **Patient Profile Management** - Record basic patient information
- 🎤 **Cry Audio Recording** - Capture and analyze baby cry patterns
- 📋 **Clinical Questionnaire** - Comprehensive symptom assessment
- 📊 **Risk Analysis** - AI-powered dehydration risk evaluation
- 📄 **PDF Reports** - Downloadable assessment reports

### Technical Features
- Real-time audio recording and processing
- Multi-step form wizard with progress tracking
- Responsive medical-themed UI design
- File upload support (PDF medical records)
- Cross-browser compatibility

---

## 🛠 Technology Stack

### Frontend Technologies

#### **React (v18.2.0)**
- **Purpose**: JavaScript library for building user interfaces
- **Why Used**: Component-based architecture, efficient rendering, large ecosystem
- **Key Concepts**: 
  - Components (functional components with hooks)
  - State management (useState)
  - Props for component communication
  - Event handling

#### **Vite (v5.0.8)**
- **Purpose**: Build tool and development server
- **Why Used**: Fast Hot Module Replacement (HMR), optimized builds, modern JS support
- **Features**:
  - Lightning-fast dev server startup
  - Instant hot module replacement
  - Optimized production builds
  - Native ES modules support

#### **JavaScript (ES6+)**
- **Modern Features Used**:
  - Arrow functions
  - Async/await
  - Template literals
  - Destructuring
  - Spread operator
  - Module imports/exports

#### **CSS3**
- **Styling Approach**: Inline styles and CSS-in-JS
- **Features**:
  - Flexbox & Grid layouts
  - CSS animations and transitions
  - Media queries for responsiveness
  - Custom properties (CSS variables)

### Backend Technologies

### We implemented an ML-ready processing pipeline and used a rule-based scoring system as the placeholder model due to limited access to clinical datasets within the hackathon timeframe. The architecture is designed so that a trained ML model can be integrated without changing the user-facing system.

#### **Python (FastAPI Framework)**
- **Purpose**: Backend API server
- **Key Features**:
  - RESTful API endpoints
  - Async request handling
  - Automatic API documentation
  - Type hints and validation

#### **Librosa**
- **Purpose**: Audio analysis library
- **Functions**:
  - Audio feature extraction
  - Pitch detection
  - Energy calculation
  - Spectral analysis

#### **NumPy**
- **Purpose**: Numerical computing
- **Usage**: Array operations, statistical calculations

---

## 📁 Project Structure

```
pedi-cry-sense/
│
├── backend/                      # Python backend server
│   ├── main.py                   # FastAPI server entry point
│   ├── analysis.py               # Audio analysis & assessment logic
│   └── requirements.txt          # Python dependencies
│
├── frontend/                     # React frontend application
│   ├── public/                   # Static assets
│   │   └── logo.png             # Application logo
│   │
│   ├── src/                      # Source code
│   │   ├── components/          # React components
│   │   │   ├── BabyProfileForm.jsx    # Patient info form
│   │   │   ├── CryRecorder.jsx        # Audio recording interface
│   │   │   ├── Questionnaire.jsx      # Clinical questions
│   │   │   └── Results.jsx            # Assessment results display
│   │   │
│   │   ├── App.jsx              # Main app component & routing
│   │   └── main.jsx             # React app entry point
│   │
│   ├── index.html               # HTML template
│   ├── package.json             # Node dependencies
│   ├── package-lock.json        # Locked dependency versions
│   └── vite.config.js           # Vite configuration
│
└── README.md                     # This file
```

---

## 🚀 Installation Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/pedi-cry-sense.git
cd pedi-cry-sense
```

### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

### Step 3: Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install Node dependencies
npm install
```

---

## 💻 Usage Instructions

### Running the Application

#### Terminal 1: Start Backend Server
```bash
cd backend
python main.py
```
The backend server will start on `http://localhost:8000`

#### Terminal 2: Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5173`

### Using the Application

1. **Step 1: Patient Profile**
   - Enter child's name
   - Enter age in months (0-36)
   - Optionally upload PDF medical records
   - Click "Continue to Recording"

2. **Step 2: Cry Recording**
   - Click "Start Recording"
   - Record 5-10 seconds of crying
   - Click "Stop Recording"
   - System automatically analyzes audio

3. **Step 3: Clinical Assessment**
   - Answer all 10 clinical questions
   - Questions cover symptoms like vomiting, diarrhea, fever, etc.
   - Progress bar shows completion status
   - Click "Get Assessment"

4. **Step 4: Results**
   - View dehydration risk level (Low/Moderate/High)
   - Review cry analysis summary
   - Read possible causes and recommendations
   - Download PDF report
   - Start new assessment if needed

---

## 🧩 Component Documentation

### 1. **App.jsx** - Main Application Component

**Purpose**: Central component that manages application state and routing between steps

**Key State Variables**:
```javascript
const [step, setStep] = useState(1);                    // Current step (1-4)
const [babyProfile, setBabyProfile] = useState(null);   // Patient info
const [cryFeatures, setCryFeatures] = useState(null);   // Audio analysis data
const [assessment, setAssessment] = useState(null);     // Final assessment
const [loading, setLoading] = useState(false);          // Loading state
```

**Key Functions**:
- `handleProfileSubmit()` - Processes profile form submission
- `handleRecordingComplete()` - Handles audio analysis results
- `handleQuestionnaireSubmit()` - Sends data to backend API
- `handleReset()` - Resets app to initial state

**How It Works**:
1. Renders progress indicator showing current step
2. Conditionally renders appropriate component based on step
3. Passes data between components via props
4. Manages API communication with backend

---

### 2. **BabyProfileForm.jsx** - Patient Information Form

**Purpose**: Collects basic patient information and optional medical records

**State Management**:
```javascript
const [babyName, setBabyName] = useState('');          // Child's name
const [ageMonths, setAgeMonths] = useState('');        // Age in months
const [medicalRecords, setMedicalRecords] = useState(null);  // PDF file
```

**Key Features**:
- **Form Validation**: Ensures required fields are filled
- **File Upload**: Accepts PDF medical records only
- **Visual Feedback**: Shows file upload status with check icon
- **Accessibility**: Proper labels and semantic HTML

**Form Fields**:
1. Name (required text input)
2. Age in months (required number input, 0-36 range)
3. Medical records (optional PDF upload)

**Medical Theme Elements**:
- Professional blue color scheme (#0066cc)
- Medical icon (👶)
- Clean, clinical interface design
- Clear labeling and instructions

---

### 3. **CryRecorder.jsx** - Audio Recording Interface

**Purpose**: Records baby cry audio and initiates analysis

**State Management**:
```javascript
const [recording, setRecording] = useState(false);     // Recording status
const [recordingTime, setRecordingTime] = useState(0); // Timer
const [analyzing, setAnalyzing] = useState(false);     // Analysis status
```

**Recording Process**:
1. **Request Microphone Access**: Uses `navigator.mediaDevices.getUserMedia()`
2. **Create MediaRecorder**: Captures audio stream
3. **Timer**: Counts 0-10 seconds
4. **Auto-Stop**: Stops at 10 seconds automatically
5. **Analysis**: Sends audio to backend API
6. **Result**: Passes features to parent component

**Key Technologies**:
- **Web Audio API**: Browser audio capture
- **MediaRecorder API**: Audio recording
- **Blob**: Audio data storage
- **FormData**: File upload to backend

**Visual States**:
- **Idle**: Shows microphone icon and start button
- **Recording**: Animated pulse effect with timer
- **Analyzing**: Loading spinner with message

---

### 4. **Questionnaire.jsx** - Clinical Assessment Form

**Purpose**: Collects symptom information through structured questions

**Question Structure**:
```javascript
const questions = [
  { 
    field: 'wet_diapers', 
    label: 'Wet diapers in last 24 hours?', 
    options: ['0-1', '2-3', '4-6', '6+'] 
  },
  // ... 9 more questions with yes/no options
];
```

**State Management**:
- Single state object with all answers
- Progress tracking (completed/total)
- Loading state during API call

**Features**:
- **Progress Bar**: Visual completion indicator
- **Radio Buttons**: Single-choice per question
- **Visual Feedback**: Selected options highlighted
- **Form Validation**: Ensures all questions answered
- **Loading State**: Disables submission during processing

**Clinical Questions Covered**:
1. Diaper wetness (hydration indicator)
2. Vomiting (fluid loss)
3. Diarrhea (dehydration cause)
4. Energy level (clinical sign)
5. Mouth dryness (dehydration symptom)
6. Swallowing pain (throat issue)
7. Mouth redness (infection sign)
8. Fever (illness indicator)
9. Gas/colic (discomfort cause)
10. Feeding difficulty (intake problem)

---

### 5. **Results.jsx** - Assessment Display

**Purpose**: Displays comprehensive assessment results

**Data Structure**:
```javascript
assessment = {
  dehydration_risk: 'Low' | 'Moderate' | 'High',
  dehydration_score: 0-6,
  throat_score: 0-4,
  cry_features_summary: {
    energy_level: string,
    cry_consistency: string
  },
  possible_causes: [strings],
  recommendations: [strings]
}
```

**Display Sections**:
1. **Risk Card**: Color-coded risk level with icon
2. **Cry Analysis**: Energy and pattern summary
3. **Possible Causes**: Numbered list
4. **Recommendations**: Action items
5. **Detailed Scores**: Expandable scoring details

**Risk Color Coding**:
```javascript
const getRiskColor = (risk) => {
  switch (risk) {
    case 'High': return '#dc2626';      // Red
    case 'Moderate': return '#f59e0b';  // Orange
    case 'Low': return '#059669';       // Green
    default: return '#6b7280';          // Gray
  }
};
```

**PDF Generation**:
- Creates HTML report
- Downloads as .html file
- User converts to PDF via browser print
- Includes all assessment details
- Professional medical formatting

---

## 🔌 API Documentation

### Backend Endpoints

#### **POST /api/cry-analyze**
Analyzes uploaded cry audio file

**Request**:
```
Method: POST
Content-Type: multipart/form-data
Body: {
  audio: File (webm/wav format)
}
```

**Response**:
```json
{
  "cry_features": {
    "pitch": "high" | "normal" | "low",
    "energy": "high" | "moderate" | "low",
    "consistency": "regular" | "irregular"
  }
}
```

**Processing Steps**:
1. Receive audio file
2. Load with librosa
3. Extract pitch using piptrack
4. Calculate RMS energy
5. Analyze temporal consistency
6. Return feature summary

---

#### **POST /api/assess**
Performs complete dehydration assessment

**Request**:
```json
{
  "baby_age_months": 6,
  "cry_features": {
    "pitch": "high",
    "energy": "moderate",
    "consistency": "regular"
  },
  "wet_diapers": "2-3",
  "vomiting": "no",
  "diarrhea": "yes",
  "sleepy_or_weak": "no",
  "dry_mouth": "yes",
  "pain_while_swallowing": "no",
  "mouth_redness": "no",
  "fever": "no",
  "gas_or_colic_signs": "yes",
  "feeding_difficulty": "no",
  "has_medical_records": true,
  "medical_records_name": "records.pdf"
}
```

**Response**:
```json
{
  "assessment": {
    "dehydration_risk": "Moderate",
    "dehydration_score": 3,
    "throat_score": 1,
    "cry_features_summary": {
      "energy_level": "Moderate",
      "cry_consistency": "Regular"
    },
    "possible_causes": [
      "Mild dehydration from insufficient fluid intake",
      "Gastrointestinal upset with diarrhea",
      "Possible gas or colic causing discomfort"
    ],
    "recommendations": [
      "Increase fluid intake gradually",
      "Monitor stool frequency and consistency",
      "Consult pediatrician if symptoms persist",
      "Keep detailed feeding log"
    ]
  }
}
```

**Assessment Algorithm**:
1. **Dehydration Scoring** (0-6 points):
   - Low wet diapers: +2
   - Vomiting: +1
   - Diarrhea: +1
   - Sleepy/weak: +1
   - Dry mouth: +1

2. **Throat Scoring** (0-4 points):
   - Pain swallowing: +2
   - Mouth redness: +2

3. **Risk Classification**:
   - 0-1 points: Low Risk
   - 2-3 points: Moderate Risk
   - 4+ points: High Risk

---

## 📚 Code Explanation

### Frontend Architecture

#### **React Component Lifecycle**

```javascript
// 1. Component renders
function BabyProfileForm({ onSubmit }) {
  
  // 2. State initialization
  const [babyName, setBabyName] = useState('');
  
  // 3. Event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: babyName });  // 4. Callback to parent
  };
  
  // 5. JSX return
  return <form onSubmit={handleSubmit}>...</form>;
}
```

#### **State Management Pattern**

```javascript
// Parent component holds shared state
function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(null);
  
  // Child updates parent state via callbacks
  const handleDataSubmit = (newData) => {
    setData(newData);
    setStep(step + 1);
  };
  
  // Parent passes data and callbacks as props
  return (
    <ChildComponent 
      data={data}
      onSubmit={handleDataSubmit}
    />
  );
}
```

#### **API Communication**

```javascript
// Async/await pattern for API calls
const handleQuestionnaireSubmit = async (answers) => {
  setLoading(true);  // Show loading state
  
  try {
    // POST request to backend
    const response = await fetch('http://localhost:8000/api/assess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers)
    });
    
    // Check response status
    if (!response.ok) {
      throw new Error('Assessment failed');
    }
    
    // Parse JSON response
    const data = await response.json();
    
    // Update state with results
    setAssessment(data.assessment);
    setStep(4);
    
  } catch (error) {
    // Error handling
    alert('Error: ' + error.message);
  } finally {
    // Always runs
    setLoading(false);
  }
};
```

### Backend Architecture

#### **FastAPI Server Setup**

```python
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(title="PediaScan API")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_methods=["*"],
    allow_headers=["*"]
)

# Define endpoints
@app.post("/api/cry-analyze")
async def analyze_cry(audio: UploadFile = File(...)):
    # Endpoint logic
    pass
```

#### **Audio Analysis Process**

```python
import librosa
import numpy as np

def analyze_cry_audio(audio_file):
    # 1. Load audio with librosa
    y, sr = librosa.load(audio_file, sr=None)
    
    # 2. Extract pitch
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitch = np.mean(pitches[magnitudes > np.median(magnitudes)])
    
    # 3. Calculate energy
    rms = librosa.feature.rms(y=y)
    energy = np.mean(rms)
    
    # 4. Analyze consistency
    onset_frames = librosa.onset.onset_detect(y=y, sr=sr)
    consistency = "regular" if len(onset_frames) > 3 else "irregular"
    
    # 5. Return features
    return {
        "pitch": classify_pitch(pitch),
        "energy": classify_energy(energy),
        "consistency": consistency
    }
```

---

## 🎨 Design Principles

### Medical Theme Implementation

**Color Palette**:
```css
--primary: #0066cc;      /* Medical blue */
--primary-dark: #0052a3; /* Darker blue for hovers */
--success: #059669;      /* Green for low risk */
--warning: #f59e0b;      /* Orange for moderate */
--danger: #dc2626;       /* Red for high risk */
--neutral: #64748b;      /* Gray for text */
--background: #f8fafc;   /* Light background */
```

**Typography**:
- Font: System fonts (Segoe UI, -apple-system)
- Hierarchy: Clear heading sizes (32px → 28px → 18px)
- Weights: 700 (bold) for headings, 600 (semibold) for labels, 400 (normal) for body

**Layout Principles**:
1. **Whitespace**: Generous padding and margins
2. **Cards**: Contained sections with borders and shadows
3. **Grids**: Responsive 2-column layouts
4. **Consistency**: Uniform border-radius (8-12px)
5. **Hierarchy**: Clear visual separation of sections

---

## 🚀 Deployment

### Production Build

```bash
# Frontend
cd frontend
npm run build
# Creates optimized build in dist/ folder

# Backend
cd backend
# Use production ASGI server like Uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Environment Variables

Create `.env` file in backend:
```env
API_PORT=8000
CORS_ORIGINS=https://yourdomain.com
DEBUG=False
```

### Deployment Platforms

**Frontend Options**:
- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

**Backend Options**:
- Railway
- Heroku
- AWS EC2
- DigitalOcean
- Google Cloud Run

---

## 🐛 Troubleshooting

### Common Issues

**1. Microphone Not Working**
```
Error: "Microphone access denied"
Solution: 
- Check browser permissions
- Use HTTPS (required for getUserMedia)
- Try different browser
```

**2. Backend Connection Failed**
```
Error: "Failed to fetch"
Solution:
- Ensure backend is running on port 8000
- Check CORS configuration
- Verify frontend is connecting to correct URL
```

**3. Audio Analysis Fails**
```
Error: "Audio analysis failed"
Solution:
- Check audio format (should be webm or wav)
- Ensure audio duration is adequate (5-10 seconds)
- Verify librosa installation
```

**4. Build Errors**
```
Error: Module not found
Solution:
- Delete node_modules and package-lock.json
- Run: npm install
- Clear npm cache: npm cache clean --force
```

---

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and commit: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/new-feature`
5. Create Pull Request

### Code Style Guidelines

**JavaScript/React**:
- Use functional components with hooks
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic

**Python**:
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Keep functions focused and small

---

## 🙏 Acknowledgments

- React team for the amazing framework
- FastAPI for the modern Python backend
- Librosa for audio analysis capabilities
- Medical professionals who provided guidance

---
