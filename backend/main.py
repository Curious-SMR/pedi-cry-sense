from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import analysis

app = FastAPI(title="PediaScan API", version="1.0.0")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionnaireData(BaseModel):
    """Schema for questionnaire + cry features"""
    baby_age_months: int
    wet_diapers: str
    vomiting: str
    diarrhea: str
    sleepy_or_weak: str
    dry_mouth: str
    pain_while_swallowing: str
    mouth_redness: str
    fever: str
    gas_or_colic_signs: str
    feeding_difficulty: str
    cry_features: Dict[str, Any]
    has_medical_records: bool = False
    medical_records_name: str = None


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "service": "PediaScan API",
        "version": "1.0.0"
    }


@app.post("/api/cry-analyze")
async def analyze_cry(audio: UploadFile = File(...)):
    """
    Endpoint 1: Analyze baby cry audio
    
    Accepts audio file and returns extracted features:
    - average_energy
    - energy_variation
    - cry_silence_ratio
    - avg_pitch
    - duration_seconds
    """
    try:
        # Validate file type
        if not audio.content_type or not audio.content_type.startswith("audio/"):
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Please upload an audio file."
            )
        
        # Read audio bytes
        audio_bytes = await audio.read()
        
        if len(audio_bytes) == 0:
            raise HTTPException(
                status_code=400,
                detail="Empty audio file received"
            )
        
        # Analyze the audio
        features = analysis.analyze_cry_audio(audio_bytes)
        
        return {
            "success": True,
            "cry_features": features,
            "message": "Audio analysis completed successfully"
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Audio analysis error: {str(e)}"
        )


@app.post("/api/assess")
async def assess_dehydration(data: QuestionnaireData):
    """
    Endpoint 2: Assess dehydration risk
    
    Combines questionnaire responses with cry audio features
    to provide risk assessment and recommendations.
    """
    try:
        # Convert Pydantic model to dict
        questionnaire = data.dict()
        cry_features = questionnaire.pop("cry_features")
        has_records = questionnaire.pop("has_medical_records", False)
        records_name = questionnaire.pop("medical_records_name", None)
        
        # Perform assessment
        assessment = analysis.assess_dehydration_risk(questionnaire, cry_features)
        
        # Add medical records info to response
        assessment["baby_age_months"] = data.baby_age_months
        assessment["has_medical_records"] = has_records
        assessment["medical_records_name"] = records_name
        
        return {
            "success": True,
            "assessment": assessment,
            "input_summary": {
                "baby_age_months": data.baby_age_months,
                "wet_diapers": data.wet_diapers,
                "medical_records_uploaded": has_records,
                "key_symptoms": [
                    k for k, v in questionnaire.items() 
                    if v == "yes" and k not in ["baby_age_months", "wet_diapers"]
                ]
            }
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Assessment error: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)