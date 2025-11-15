import React, { useState } from 'react';

function BabyProfileForm({ onSubmit }) {
  const [babyName, setBabyName] = useState('');
  const [ageMonths, setAgeMonths] = useState('');
  const [medicalRecords, setMedicalRecords] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setMedicalRecords(file);
      } else {
        alert('Please upload a PDF file');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!babyName.trim() || !ageMonths) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit({ 
      name: babyName, 
      age_months: parseInt(ageMonths),
      has_medical_records: medicalRecords !== null,
      medical_records_name: medicalRecords?.name || null
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h2 style={styles.heading}>Baby Profile</h2>
        <p style={styles.description}>Let's start by getting some basic information about your baby.</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Baby's Name <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={babyName}
            onChange={(e) => setBabyName(e.target.value)}
            placeholder="e.g., Emma"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Age in Months <span style={styles.required}>*</span>
          </label>
          <input
            type="number"
            min="0"
            max="36"
            value={ageMonths}
            onChange={(e) => setAgeMonths(e.target.value)}
            placeholder="e.g., 6"
            style={styles.input}
            required
          />
          <small style={styles.hint}>Age between 0-36 months</small>
        </div>

        <div style={styles.divider}></div>

        {/* Medical Records Upload */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Medical Records <span style={styles.optional}>(Optional)</span>
          </label>
          <div style={styles.uploadArea}>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={styles.fileInput}
              id="medical-records"
            />
            <label 
              htmlFor="medical-records" 
              style={{
                ...styles.uploadLabel,
                ...(medicalRecords ? styles.uploadLabelActive : {})
              }}
            >
              {medicalRecords ? (
                <div style={styles.fileSuccess}>
                  <div style={styles.checkIcon}>✓</div>
                  <div>
                    <div style={styles.fileName}>{medicalRecords.name}</div>
                    <small style={styles.fileSize}>
                      {(medicalRecords.size / 1024).toFixed(1)} KB
                    </small>
                  </div>
                </div>
              ) : (
                <>
                  <div style={styles.uploadIcon}>📄</div>
                  <div style={styles.uploadText}>
                    <span style={styles.uploadTitle}>Upload PDF Document</span>
                    <small style={styles.uploadHint}>Click or drag file here</small>
                  </div>
                </>
              )}
            </label>
            {medicalRecords && (
              <button
                type="button"
                onClick={() => {
                  setMedicalRecords(null);
                  document.getElementById('medical-records').value = '';
                }}
                style={styles.removeButton}
              >
                ✕ Remove File
              </button>
            )}
          </div>
        </div>

        <button type="submit" style={styles.submitButton}>
          Continue to Recording →
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '540px',
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
    fontSize: '15px',
    lineHeight: '1.6',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontWeight: '600',
    color: '#374151',
    fontSize: '14px',
    letterSpacing: '0.01em',
  },
  required: {
    color: '#ef4444',
    marginLeft: '2px',
  },
  optional: {
    fontWeight: '400',
    color: '#9ca3af',
    fontSize: '13px',
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '15px',
    transition: 'all 0.2s',
    outline: 'none',
    backgroundColor: '#ffffff',
  },
  hint: {
    color: '#9ca3af',
    fontSize: '13px',
    marginTop: '-2px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '8px 0',
  },
  uploadArea: {
    position: 'relative',
  },
  fileInput: {
    display: 'none',
  },
  uploadLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    border: '2px dashed #d1d5db',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    backgroundColor: '#f9fafb',
    minHeight: '140px',
  },
  uploadLabelActive: {
    backgroundColor: '#f0fdf4',
    borderColor: '#86efac',
    borderStyle: 'solid',
  },
  uploadIcon: {
    fontSize: '48px',
    marginBottom: '12px',
    opacity: 0.7,
  },
  uploadText: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  uploadTitle: {
    color: '#374151',
    fontWeight: '500',
    fontSize: '15px',
  },
  uploadHint: {
    color: '#9ca3af',
    fontSize: '13px',
  },
  fileSuccess: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  checkIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  fileName: {
    color: '#16a34a',
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '4px',
  },
  fileSize: {
    color: '#6b7280',
    fontSize: '12px',
  },
  removeButton: {
    marginTop: '12px',
    padding: '8px 16px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
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
    marginTop: '8px',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(102, 126, 234, 0.25)',
  },
};

export default BabyProfileForm;