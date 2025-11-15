import librosa
import numpy as np
import io
import tempfile
import os
from pydub import AudioSegment
from pydub.utils import which

# Check if ffmpeg is available
AudioSegment.converter = which("ffmpeg")
AudioSegment.ffprobe = which("ffprobe")

def analyze_cry_audio(audio_bytes: bytes) -> dict:
    """
    Analyze baby cry audio and extract key features.
    """
    temp_file = None
    try:
        # Check if ffmpeg is available
        if not AudioSegment.converter:
            raise ValueError("ffmpeg not found. Please install ffmpeg: https://ffmpeg.org/download.html")
        
        # Create a temporary file to handle the audio
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.webm')
        temp_file.write(audio_bytes)
        temp_file.close()
        
        print(f"Processing audio file: {temp_file.name}, size: {len(audio_bytes)} bytes")
        
        # Convert to WAV using pydub (handles various formats)
        try:
            audio = AudioSegment.from_file(temp_file.name, format="webm")
        except Exception as e:
            print(f"Error loading webm: {e}")
            # Try without specifying format
            audio = AudioSegment.from_file(temp_file.name)
        
        # Convert to mono and set sample rate
        audio = audio.set_channels(1)
        audio = audio.set_frame_rate(22050)
        
        # Export to WAV format in memory
        wav_buffer = io.BytesIO()
        audio.export(wav_buffer, format="wav")
        wav_buffer.seek(0)
        
        # Load with librosa
        y, sr = librosa.load(wav_buffer, sr=22050, mono=True)
        
        # Ensure we have audio data
        if len(y) == 0:
            raise ValueError("No audio data found")
        
        print(f"Audio loaded: {len(y)} samples, {sr} Hz")
        
        # Feature 1: Average Energy (RMS - Root Mean Square)
        rms = librosa.feature.rms(y=y)[0]
        average_energy = float(np.mean(rms))
        
        # Feature 2: Energy Variation
        energy_variation = float(np.std(rms))
        
        # Feature 3: Cry/Silence Ratio
        threshold = np.mean(rms) * 0.3
        cry_frames = np.sum(rms > threshold)
        total_frames = len(rms)
        cry_silence_ratio = float(cry_frames / total_frames) if total_frames > 0 else 0
        
        # Additional feature: Spectral centroid (pitch indicator)
        spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
        avg_pitch = float(np.mean(spectral_centroid))
        
        print(f"Analysis complete: energy={average_energy}, ratio={cry_silence_ratio}")
        
        return {
            "average_energy": round(average_energy, 6),
            "energy_variation": round(energy_variation, 6),
            "cry_silence_ratio": round(cry_silence_ratio, 3),
            "avg_pitch": round(avg_pitch, 2),
            "duration_seconds": round(len(y) / sr, 2)
        }
        
    except Exception as e:
        print(f"Audio analysis error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise ValueError(f"Audio processing failed: {str(e)}. Make sure ffmpeg is installed.")
    
    finally:
        # Clean up temporary file
        if temp_file and os.path.exists(temp_file.name):
            try:
                os.unlink(temp_file.name)
            except:
                pass


def assess_dehydration_risk(questionnaire: dict, cry_features: dict) -> dict:
    """
    Rule-based assessment combining questionnaire responses and cry features.
    """
    dehydration_score = 0
    throat_score = 0
    possible_causes = []
    recommendations = []
    
    # === DEHYDRATION SCORING ===
    
    wet_diapers = questionnaire.get("wet_diapers", "")
    if wet_diapers in ["0-1", "0", "1"]:
        dehydration_score += 2
        recommendations.append("Monitor diaper output closely")
    elif wet_diapers == "2-3":
        dehydration_score += 1
    
    if questionnaire.get("vomiting") == "yes":
        dehydration_score += 1
        recommendations.append("Ensure adequate fluid intake")
    
    if questionnaire.get("diarrhea") == "yes":
        dehydration_score += 1
        recommendations.append("Watch for signs of dehydration")
    
    if questionnaire.get("sleepy_or_weak") == "yes":
        dehydration_score += 1
        recommendations.append("Monitor baby's activity level")
    
    if questionnaire.get("dry_mouth") == "yes":
        dehydration_score += 1
    
    if cry_features.get("average_energy", 1) < 0.005 and cry_features.get("cry_silence_ratio", 1) < 0.4:
        dehydration_score += 1
        possible_causes.append("Weak cry pattern detected (may indicate low energy)")
    
    # === THROAT PAIN / INFECTION SCORING ===
    
    if questionnaire.get("pain_while_swallowing") == "yes":
        throat_score += 2
    
    if questionnaire.get("mouth_redness") == "yes":
        throat_score += 1
    
    if questionnaire.get("fever") == "yes":
        throat_score += 1
        recommendations.append("Monitor temperature regularly")
    
    if cry_features.get("average_energy", 0) > 0.015 and cry_features.get("energy_variation", 0) > 0.01:
        throat_score += 1
        possible_causes.append("Intense cry pattern detected (may indicate discomfort/pain)")
    
    # === OTHER CONDITIONS ===
    
    if questionnaire.get("gas_or_colic_signs") == "yes":
        possible_causes.append("Possible gas/colic")
        recommendations.append("Try gentle tummy massage or burping techniques")
    
    if questionnaire.get("feeding_difficulty") == "yes":
        possible_causes.append("Feeding difficulties reported")
        recommendations.append("Consult pediatrician about feeding concerns")
    
    # === DETERMINE RISK LEVEL ===
    
    if dehydration_score >= 4:
        risk_level = "High"
        possible_causes.insert(0, "⚠️ Possible dehydration (multiple indicators)")
        recommendations.insert(0, "⚠️ SEEK MEDICAL ATTENTION PROMPTLY")
    elif dehydration_score >= 2:
        risk_level = "Moderate"
        possible_causes.insert(0, "⚠️ Possible mild dehydration")
        recommendations.insert(0, "Contact your pediatrician for guidance")
    else:
        risk_level = "Low"
        if not possible_causes:
            possible_causes.append("No significant dehydration indicators detected")
    
    if throat_score >= 3:
        possible_causes.insert(0, "⚠️ Possible throat pain/infection")
        recommendations.insert(0, "Consider consulting pediatrician about throat symptoms")
    
    if not recommendations:
        recommendations.append("Continue normal monitoring")
    
    return {
        "dehydration_risk": risk_level,
        "dehydration_score": dehydration_score,
        "throat_score": throat_score,
        "possible_causes": possible_causes,
        "recommendations": recommendations,
        "cry_features_summary": {
            "energy_level": "Low" if cry_features.get("average_energy", 0) < 0.005 else "Normal" if cry_features.get("average_energy", 0) < 0.015 else "High",
            "cry_consistency": "Intermittent" if cry_features.get("cry_silence_ratio", 0) < 0.5 else "Consistent"
        }
    }