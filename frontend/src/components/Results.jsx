import React from 'react';

function Results({ assessment, onReset }) {
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return '#dc2626';
      case 'Moderate': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'High': return '🚨';
      case 'Moderate': return '⚠️';
      case 'Low': return '✅';
      default: return 'ℹ️';
    }
  };

  const downloadPDF = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    // Create HTML content for PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>PediaScan Assessment Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px;
            background: white;
            color: #1a1a1a;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #667eea;
        }
        .logo {
            font-size: 48px;
            margin-bottom: 10px;
        }
        .title {
            font-size: 32px;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 5px;
        }
        .subtitle {
            font-size: 14px;
            color: #6b7280;
        }
        .meta {
            text-align: right;
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 30px;
        }
        .risk-section {
            background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            border-left: 5px solid ${getRiskColor(assessment.dehydration_risk)};
        }
        .risk-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #6b7280;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }
        .risk-value {
            font-size: 36px;
            font-weight: 700;
            color: ${getRiskColor(assessment.dehydration_risk)};
        }
        .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        .section-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
            color: #1a1a1a;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .section-icon {
            font-size: 24px;
        }
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        .card {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .card-label {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 8px;
            font-weight: 600;
        }
        .card-value {
            font-size: 18px;
            font-weight: 700;
            color: #1a1a1a;
        }
        .list {
            list-style: none;
            padding: 0;
        }
        .list-item {
            background: #f9fafb;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 6px;
            border-left: 4px solid #667eea;
            display: flex;
            gap: 12px;
        }
        .list-number {
            background: #667eea;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            flex-shrink: 0;
        }
        .list-text {
            flex: 1;
            font-size: 14px;
            color: #374151;
        }
        .scores {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 20px;
        }
        .score-card {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e5e7eb;
        }
        .score-label {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 10px;
            font-weight: 600;
        }
        .score-value {
            font-size: 32px;
            font-weight: 700;
            color: #667eea;
        }
        .score-max {
            font-size: 18px;
            color: #9ca3af;
        }
        .disclaimer {
            background: #fef3c7;
            border: 2px solid #fbbf24;
            padding: 20px;
            border-radius: 8px;
            margin-top: 40px;
            font-size: 13px;
            color: #92400e;
            line-height: 1.8;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
        }
        @media print {
            body { padding: 20px; }
            .risk-section { break-inside: avoid; }
            .section { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">🍼</div>
        <div class="title">PediaScan</div>
        <div class="subtitle">AI-Powered Pediatric Dehydration Assessment</div>
    </div>

    <div class="meta">
        <strong>Report Generated:</strong> ${date} at ${time}
    </div>

    <div class="risk-section">
        <div class="risk-label">Dehydration Risk Assessment</div>
        <div class="risk-value">${getRiskIcon(assessment.dehydration_risk)} ${assessment.dehydration_risk} Risk</div>
    </div>

    <div class="section">
        <div class="section-title">
            <span class="section-icon">📊</span>
            <span>Cry Analysis Summary</span>
        </div>
        <div class="grid">
            <div class="card">
                <div class="card-label">Energy Level</div>
                <div class="card-value">${assessment.cry_features_summary.energy_level}</div>
            </div>
            <div class="card">
                <div class="card-label">Cry Pattern</div>
                <div class="card-value">${assessment.cry_features_summary.cry_consistency}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">
            <span class="section-icon">🔍</span>
            <span>Possible Causes</span>
        </div>
        <ul class="list">
            ${assessment.possible_causes.map((cause, index) => `
                <li class="list-item">
                    <span class="list-number">${index + 1}</span>
                    <span class="list-text">${cause}</span>
                </li>
            `).join('')}
        </ul>
    </div>

    <div class="section">
        <div class="section-title">
            <span class="section-icon">💡</span>
            <span>Recommendations</span>
        </div>
        <ul class="list">
            ${assessment.recommendations.map((rec, index) => `
                <li class="list-item">
                    <span class="list-number">${index + 1}</span>
                    <span class="list-text">${rec}</span>
                </li>
            `).join('')}
        </ul>
    </div>

    <div class="section">
        <div class="section-title">
            <span class="section-icon">📈</span>
            <span>Detailed Assessment Scores</span>
        </div>
        <div class="scores">
            <div class="score-card">
                <div class="score-label">Dehydration Score</div>
                <div class="score-value">${assessment.dehydration_score}<span class="score-max">/6</span></div>
            </div>
            <div class="score-card">
                <div class="score-label">Throat Pain Score</div>
                <div class="score-value">${assessment.throat_score}<span class="score-max">/4</span></div>
            </div>
        </div>
    </div>

    <div class="disclaimer">
        <strong>⚠️ MEDICAL DISCLAIMER</strong><br><br>
        This assessment is generated by an AI-powered tool and is intended for informational 
        purposes only. It does NOT constitute medical advice, diagnosis, or treatment. 
        AI systems can make mistakes. Always consult a qualified pediatrician or healthcare 
        professional for accurate diagnosis and treatment of health concerns.
    </div>

    <div class="footer">
        Generated by PediaScan • AI-Powered Pediatric Assessment Tool<br>
        This is an automated report and does not replace professional medical consultation.
    </div>
</body>
</html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PediaScan_Report_${date.replace(/\//g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show instruction to user
    setTimeout(() => {
      alert('Report downloaded! Open the HTML file and use your browser\'s "Print to PDF" option (Ctrl/Cmd + P) to save as PDF.');
    }, 500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h2 style={styles.heading}>Assessment Results</h2>
        <p style={styles.subheading}>Complete analysis based on cry patterns and symptoms</p>
      </div>

      {/* Risk Level Card */}
      <div style={{
        ...styles.riskCard,
        backgroundColor: getRiskColor(assessment.dehydration_risk) + '10',
        borderColor: getRiskColor(assessment.dehydration_risk),
      }}>
        <div style={styles.riskIcon}>
          {getRiskIcon(assessment.dehydration_risk)}
        </div>
        <div style={styles.riskContent}>
          <div style={styles.riskLabel}>Dehydration Risk Level</div>
          <div style={{
            ...styles.riskLevel,
            color: getRiskColor(assessment.dehydration_risk),
          }}>
            {assessment.dehydration_risk}
          </div>
        </div>
      </div>

      {/* Cry Features Summary */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionIcon}>📊</span>
          <h3 style={styles.sectionTitle}>Cry Analysis Summary</h3>
        </div>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureLabel}>Energy Level</div>
            <div style={styles.featureValue}>
              {assessment.cry_features_summary.energy_level}
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureLabel}>Cry Pattern</div>
            <div style={styles.featureValue}>
              {assessment.cry_features_summary.cry_consistency}
            </div>
          </div>
        </div>
      </div>

      {/* Possible Causes */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionIcon}>🔍</span>
          <h3 style={styles.sectionTitle}>Possible Causes</h3>
        </div>
        <div style={styles.listContainer}>
          {assessment.possible_causes.map((cause, index) => (
            <div key={index} style={styles.listItem}>
              <span style={styles.listBullet}>{index + 1}</span>
              <span style={styles.listText}>{cause}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionIcon}>💡</span>
          <h3 style={styles.sectionTitle}>Recommendations</h3>
        </div>
        <div style={styles.listContainer}>
          {assessment.recommendations.map((rec, index) => (
            <div key={index} style={styles.listItem}>
              <span style={styles.listBullet}>{index + 1}</span>
              <span style={styles.listText}>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Scores */}
      <div style={styles.scoresSection}>
        <details style={styles.details}>
          <summary style={styles.summary}>📈 View Detailed Scores</summary>
          <div style={styles.scoresGrid}>
            <div style={styles.scoreCard}>
              <div style={styles.scoreLabel}>Dehydration Score</div>
              <div style={styles.scoreValue}>{assessment.dehydration_score}<span style={styles.scoreMax}>/6</span></div>
            </div>
            <div style={styles.scoreCard}>
              <div style={styles.scoreLabel}>Throat Pain Score</div>
              <div style={styles.scoreValue}>{assessment.throat_score}<span style={styles.scoreMax}>/4</span></div>
            </div>
          </div>
        </details>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button onClick={downloadPDF} style={styles.downloadButton}>
          📥 Download PDF Report
        </button>
        <button onClick={onReset} style={styles.resetButton}>
          🔄 New Assessment
        </button>
      </div>

      {/* Disclaimer */}
      <div style={styles.disclaimer}>
        <span style={styles.disclaimerIcon}>⚠️</span>
        <span style={styles.disclaimerText}>
          <strong>Medical Disclaimer:</strong> AI can make mistakes. This tool provides preliminary assessment only. 
          Always consult a qualified pediatrician for medical advice.
        </span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '720px',
    margin: '0 auto',
  },
  headerSection: {
    marginBottom: '32px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    color: '#1a1a1a',
    marginBottom: '8px',
    fontWeight: '700',
  },
  subheading: {
    fontSize: '15px',
    color: '#6b7280',
  },
  riskCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '28px',
    borderRadius: '16px',
    border: '3px solid',
    marginBottom: '32px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  riskIcon: {
    fontSize: '56px',
    lineHeight: 1,
  },
  riskContent: {
    flex: 1,
  },
  riskLabel: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '6px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  riskLevel: {
    fontSize: '36px',
    fontWeight: '700',
    lineHeight: 1,
  },
  section: {
    marginBottom: '28px',
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  sectionIcon: {
    fontSize: '24px',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#1a1a1a',
    fontWeight: '600',
    margin: 0,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  featureCard: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
  },
  featureLabel: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '8px',
    fontWeight: '500',
  },
  featureValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px 16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  listBullet: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#667eea',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    flexShrink: 0,
    marginTop: '2px',
  },
  listText: {
    flex: 1,
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.6',
  },
  scoresSection: {
    marginBottom: '28px',
  },
  details: {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
  },
  summary: {
    fontWeight: '600',
    color: '#667eea',
    fontSize: '15px',
    cursor: 'pointer',
    listStyle: 'none',
  },
  scoresGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '20px',
  },
  scoreCard: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
  },
  scoreLabel: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '10px',
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#667eea',
  },
  scoreMax: {
    fontSize: '20px',
    color: '#9ca3af',
    marginLeft: '2px',
  },
  actionButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '28px',
  },
  downloadButton: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '16px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(16, 185, 129, 0.25)',
  },
  resetButton: {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '16px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(102, 126, 234, 0.25)',
  },
  disclaimer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    backgroundColor: '#fef3c7',
    border: '2px solid #fbbf24',
    padding: '16px',
    borderRadius: '10px',
  },
  disclaimerIcon: {
    fontSize: '20px',
    flexShrink: 0,
  },
  disclaimerText: {
    fontSize: '13px',
    color: '#92400e',
    lineHeight: '1.6',
  },
};

export default Results;