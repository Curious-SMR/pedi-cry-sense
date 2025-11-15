import React, { useState, useRef } from 'react';

function CryRecorder({ onComplete, onBack }) {
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await analyzeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 10) {
            stopRecording();
            return 10;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      alert('Microphone access denied. Please allow microphone access and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const analyzeAudio = async (audioBlob) => {
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'baby_cry.webm');

      const response = await fetch('http://localhost:8000/api/cry-analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Audio analysis failed');
      }

      const data = await response.json();
      onComplete(data.cry_features);
    } catch (error) {
      alert('Error analyzing audio: ' + error.message);
      setAnalyzing(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h2 style={styles.heading}>Record Baby's Cry</h2>
        <p style={styles.description}>
          Record 5-10 seconds of your baby crying in a quiet environment for best results.
        </p>
      </div>

      <div style={styles.recordingArea}>
        {!recording && !analyzing && (
          <>
            <div style={styles.micIcon}>🎤</div>
            <button onClick={startRecording} style={styles.recordButton}>
              <span style={styles.recordButtonIcon}>⚫</span>
              Start Recording
            </button>
            <p style={styles.tip}>5-10 seconds recommended</p>
          </>
        )}

        {recording && (
          <>
            <div style={styles.recordingAnimation}>
              <div style={styles.pulse}></div>
              <div style={styles.micIconRecording}>🎤</div>
            </div>
            <div style={styles.timer}>
              <span style={styles.timerNumber}>{recordingTime}</span>
              <span style={styles.timerUnit}>seconds</span>
            </div>
            <button onClick={stopRecording} style={styles.stopButton}>
              <span style={styles.stopButtonIcon}>⬛</span>
              Stop Recording
            </button>
            <p style={styles.recordingText}>Recording in progress...</p>
          </>
        )}

        {analyzing && (
          <>
            <div style={styles.loaderContainer}>
              <div style={styles.loader}></div>
            </div>
            <p style={styles.analyzingText}>Analyzing cry patterns...</p>
            <p style={styles.analyzingSubtext}>This may take a few moments</p>
          </>
        )}
      </div>

      {!recording && !analyzing && (
        <button onClick={onBack} style={styles.backButton}>
          ← Back to Profile
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '540px',
    margin: '0 auto',
    textAlign: 'center',
  },
  headerSection: {
    marginBottom: '40px',
  },
  heading: {
    fontSize: '28px',
    color: '#1a1a1a',
    marginBottom: '12px',
    fontWeight: '700',
  },
  description: {
    color: '#6b7280',
    fontSize: '15px',
    lineHeight: '1.6',
  },
  recordingArea: {
    backgroundColor: '#f9fafb',
    borderRadius: '16px',
    padding: '60px 40px',
    marginBottom: '24px',
    border: '2px solid #e5e7eb',
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    fontSize: '72px',
    marginBottom: '24px',
    opacity: 0.8,
  },
  micIconRecording: {
    fontSize: '72px',
    position: 'relative',
    zIndex: 2,
  },
  recordButton: {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '16px 32px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(220, 38, 38, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  recordButtonIcon: {
    fontSize: '12px',
  },
  stopButton: {
    backgroundColor: '#6b7280',
    color: 'white',
    padding: '16px 32px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '24px',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(107, 114, 128, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  stopButtonIcon: {
    fontSize: '12px',
  },
  tip: {
    color: '#9ca3af',
    fontSize: '14px',
    marginTop: '16px',
    fontWeight: '500',
  },
  recordingAnimation: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '20px',
  },
  pulse: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#dc2626',
    opacity: 0.3,
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  timer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 0',
  },
  timerNumber: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#dc2626',
    lineHeight: 1,
  },
  timerUnit: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px',
    fontWeight: '500',
  },
  recordingText: {
    color: '#dc2626',
    fontWeight: '600',
    marginTop: '12px',
    fontSize: '15px',
  },
  loaderContainer: {
    marginBottom: '24px',
  },
  loader: {
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
  },
  analyzingText: {
    color: '#667eea',
    fontWeight: '600',
    fontSize: '16px',
    marginBottom: '8px',
  },
  analyzingSubtext: {
    color: '#9ca3af',
    fontSize: '14px',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#667eea',
    padding: '14px 28px',
    border: '2px solid #667eea',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
};

// CSS animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
      50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.1; }
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    button:active {
      transform: translateY(0);
    }
  `;
  if (!document.getElementById('cry-recorder-styles')) {
    style.id = 'cry-recorder-styles';
    document.head.appendChild(style);
  }
}

export default CryRecorder;