import React, { useState } from 'react';

function Questionnaire({ onSubmit, onBack, loading }) {
  const [answers, setAnswers] = useState({
    wet_diapers: '',
    vomiting: '',
    diarrhea: '',
    sleepy_or_weak: '',
    dry_mouth: '',
    pain_while_swallowing: '',
    mouth_redness: '',
    fever: '',
    gas_or_colic_signs: '',
    feeding_difficulty: '',
  });

  const handleChange = (field, value) => {
    setAnswers({ ...answers, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFilled = Object.values(answers).every(val => val !== '');
    if (!allFilled) {
      alert('Please answer all questions before continuing');
      return;
    }
    onSubmit(answers);
  };

  const progress = Object.values(answers).filter(val => val !== '').length;
  const total = Object.keys(answers).length;

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h2 style={styles.heading}>Health Questionnaire</h2>
        <p style={styles.description}>
          Please answer all questions about your baby's current condition.
        </p>
        <div style={styles.progressIndicator}>
          <div style={styles.progressBar}>
            <div style={{
              ...styles.progressFill,
              width: `${(progress / total) * 100}%`
            }}></div>
          </div>
          <span style={styles.progressText}>{progress} of {total} completed</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Question 1 */}
        <div style={styles.questionGroup}>
          <label style={styles.questionLabel}>
            How many wet diapers in the last 24 hours?
          </label>
          <div style={styles.radioGroup}>
            {['0-1', '2-3', '4-6', '6+'].map(option => (
              <label 
                key={option} 
                style={{
                  ...styles.radioLabel,
                  ...(answers.wet_diapers === option ? styles.radioLabelActive : {})
                }}
              >
                <input
                  type="radio"
                  name="wet_diapers"
                  value={option}
                  checked={answers.wet_diapers === option}
                  onChange={(e) => handleChange('wet_diapers', e.target.value)}
                  style={styles.radio}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Questions 2-10 */}
        {[
          { field: 'vomiting', label: 'Has your baby been vomiting?' },
          { field: 'diarrhea', label: 'Does your baby have diarrhea?' },
          { field: 'sleepy_or_weak', label: 'Is your baby unusually sleepy or weak?' },
          { field: 'dry_mouth', label: 'Does your baby have dry mouth or lips?' },
          { field: 'pain_while_swallowing', label: 'Does your baby show signs of pain while swallowing?' },
          { field: 'mouth_redness', label: 'Is there redness in the mouth or throat?' },
          { field: 'fever', label: 'Does your baby have a fever?' },
          { field: 'gas_or_colic_signs', label: 'Are there signs of gas or colic?' },
          { field: 'feeding_difficulty', label: 'Is your baby having difficulty feeding?' },
        ].map(({ field, label }) => (
          <div key={field} style={styles.questionGroup}>
            <label style={styles.questionLabel}>{label}</label>
            <div style={styles.radioGroup}>
              {['yes', 'no'].map(option => (
                <label 
                  key={option} 
                  style={{
                    ...styles.radioLabel,
                    ...(answers[field] === option ? styles.radioLabelActive : {})
                  }}
                >
                  <input
                    type="radio"
                    name={field}
                    value={option}
                    checked={answers[field] === option}
                    onChange={(e) => handleChange(field, e.target.value)}
                    style={styles.radio}
                  />
                  <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div style={styles.buttonGroup}>
          <button 
            type="button" 
            onClick={onBack} 
            style={styles.backButton}
            disabled={loading}
          >
            ← Back
          </button>
          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              ...(loading ? styles.submitButtonLoading : {})
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span style={styles.spinner}></span>
                Analyzing...
              </>
            ) : (
              'Get Assessment →'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '640px',
    margin: '0 auto',
  },
  headerSection: {
    marginBottom: '32px',
  },
  heading: {
    fontSize: '28px',
    color: '#1a1a1a',
    marginBottom: '8px',
    fontWeight: '700',
  },
  description: {
    color: '#6b7280',
    marginBottom: '20px',
    fontSize: '15px',
    lineHeight: '1.6',
  },
  progressIndicator: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  questionGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingBottom: '24px',
    borderBottom: '1px solid #e5e7eb',
  },
  questionLabel: {
    fontWeight: '600',
    color: '#374151',
    fontSize: '15px',
    lineHeight: '1.5',
  },
  radioGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    padding: '12px 20px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    transition: 'all 0.2s',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: '#ffffff',
    minWidth: '90px',
    justifyContent: 'center',
  },
  radioLabelActive: {
    borderColor: '#667eea',
    backgroundColor: '#ede9fe',
    color: '#667eea',
  },
  radio: {
    cursor: 'pointer',
    accentColor: '#667eea',
  },
  buttonGroup: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr',
    gap: '16px',
    marginTop: '16px',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#667eea',
    padding: '16px',
    border: '2px solid #667eea',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  submitButton: {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '16px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(102, 126, 234, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  submitButtonLoading: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid #ffffff',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

export default Questionnaire;