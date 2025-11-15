import React, { useState } from 'react';
import BabyProfileForm from './components/BabyProfileForm';
import Questionnaire from './components/Questionnaire';
import CryRecorder from './components/CryRecorder';
import Results from './components/Results';

function App() {
  const [step, setStep] = useState(1);
  const [babyProfile, setBabyProfile] = useState(null);
  const [cryFeatures, setCryFeatures] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProfileSubmit = (profile) => {
    setBabyProfile(profile);
    setStep(2);
  };

  const handleRecordingComplete = (features) => {
    setCryFeatures(features);
    setStep(3);
  };

  const handleQuestionnaireSubmit = async (answers) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...answers,
          baby_age_months: babyProfile.age_months,
          cry_features: cryFeatures,
          has_medical_records: babyProfile.has_medical_records,
          medical_records_name: babyProfile.medical_records_name,
        }),
      });

      if (!response.ok) {
        throw new Error('Assessment failed');
      }

      const data = await response.json();
      setAssessment(data.assessment);
      setStep(4);
    } catch (error) {
      alert('Error during assessment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setBabyProfile(null);
    setCryFeatures(null);
    setAssessment(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>🍼</div>
          <h1 style={styles.title}>PediaScan</h1>
          <p style={styles.subtitle}>AI-Powered Pediatric Dehydration Assessment</p>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressBar}>
          <div style={styles.progressStep}>
            <div style={{
              ...styles.progressCircle,
              ...(step >= 1 ? styles.progressCircleActive : {})
            }}>
              {step > 1 ? '✓' : '1'}
            </div>
            <span style={styles.progressLabel}>Profile</span>
          </div>
          <div style={{
            ...styles.progressLine,
            ...(step >= 2 ? styles.progressLineActive : {})
          }}></div>
          <div style={styles.progressStep}>
            <div style={{
              ...styles.progressCircle,
              ...(step >= 2 ? styles.progressCircleActive : {})
            }}>
              {step > 2 ? '✓' : '2'}
            </div>
            <span style={styles.progressLabel}>Record</span>
          </div>
          <div style={{
            ...styles.progressLine,
            ...(step >= 3 ? styles.progressLineActive : {})
          }}></div>
          <div style={styles.progressStep}>
            <div style={{
              ...styles.progressCircle,
              ...(step >= 3 ? styles.progressCircleActive : {})
            }}>
              {step > 3 ? '✓' : '3'}
            </div>
            <span style={styles.progressLabel}>Questions</span>
          </div>
          <div style={{
            ...styles.progressLine,
            ...(step >= 4 ? styles.progressLineActive : {})
          }}></div>
          <div style={styles.progressStep}>
            <div style={{
              ...styles.progressCircle,
              ...(step >= 4 ? styles.progressCircleActive : {})
            }}>
              {step > 4 ? '✓' : '4'}
            </div>
            <span style={styles.progressLabel}>Results</span>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {step === 1 && <BabyProfileForm onSubmit={handleProfileSubmit} />}
          {step === 2 && <CryRecorder onComplete={handleRecordingComplete} onBack={() => setStep(1)} />}
          {step === 3 && (
            <Questionnaire 
              onSubmit={handleQuestionnaireSubmit} 
              onBack={() => setStep(2)}
              loading={loading}
            />
          )}
          {step === 4 && <Results assessment={assessment} onReset={handleReset} />}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            ⚠️ AI can make mistakes. Always consult a pediatrician for health concerns.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    maxWidth: '900px',
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px 32px',
    textAlign: 'center',
  },
  logo: {
    fontSize: '48px',
    marginBottom: '12px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '8px',
    fontWeight: '700',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '16px',
    opacity: 0.95,
    fontWeight: '400',
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 32px',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  progressCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '3px solid #d1d5db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '16px',
    color: '#9ca3af',
    backgroundColor: 'white',
    transition: 'all 0.3s',
  },
  progressCircleActive: {
    backgroundColor: '#667eea',
    color: 'white',
    borderColor: '#667eea',
    boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)',
  },
  progressLabel: {
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '600',
  },
  progressLine: {
    width: '80px',
    height: '3px',
    backgroundColor: '#e5e7eb',
    margin: '0 16px',
    marginBottom: '28px',
    transition: 'all 0.3s',
  },
  progressLineActive: {
    backgroundColor: '#667eea',
  },
  content: {
    padding: '48px 40px',
    minHeight: '500px',
  },
  footer: {
    backgroundColor: '#fef3c7',
    borderTop: '2px solid #fde68a',
    padding: '20px 32px',
  },
  footerText: {
    margin: 0,
    fontSize: '14px',
    color: '#92400e',
    textAlign: 'center',
    fontWeight: '500',
  },
};

export default App;