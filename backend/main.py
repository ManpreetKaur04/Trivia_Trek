from fastapi import FastAPI, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import  datetime, timedelta
from passlib.context import CryptContext
from models import User
import models
from database import SessionLocal, engine, Base
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Annotated
import auth
from auth import get_current_user
import openai


app = FastAPI()
app.include_router(auth.router)

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

@app.get("/", status_code=status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return {'User': user}


origins = [
    "http://localhost:3000", 
    "https://yourfrontenddomain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)



class Option(BaseModel):
    option_a: str
    option_b: str
    option_c: str
    option_d: str

class Question(BaseModel):
    id: int
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str

class Quiz(BaseModel):
    questions: List[Question]


class AnswerCheckResponse(BaseModel):
    question_text: str
    selected_answer: str
    correct_answer: str
    feedback: str    

class AnswerCheckRequest(BaseModel):
    question_text: str
    selected_answers: List[str]  


@app.get("/quiz/{set_id}", response_model=Quiz)
async def get_questions(set_id: int, db: Session = Depends(get_db)):
    questions = db.query(models.Question).filter(models.Question.question_set_id == set_id).all()

    if not questions:
        raise HTTPException(status_code=404, detail="Quiz not found")

    questions_data = [
        Question(
            id=q.id,
            question_text=q.question_text,
            option_a=q.option_a,
            option_b=q.option_b,
            option_c=q.option_c,
            option_d=q.option_d,
            correct_answer=q.correct_answer,
        )
        for q in questions
    ]

    return Quiz(questions=questions_data)


openai.api_key = 'Your_openai_api_key'

@app.post("/check_answer/", response_model=AnswerCheckResponse)
async def check_answer(request: AnswerCheckRequest, db: Session = Depends(get_db)):
    
    question = db.query(models.Question).filter(models.Question.question_text == request.question_text).first()

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    
    is_correct = set(request.selected_answers) == set(question.correct_answer.split(','))  
    
    feedback = "Correct! Well done." if is_correct else f"Wrong answer. The correct answer is {question.correct_answer}."

   
    openai_prompt = (
        f"Question: {request.question_text}\n"
        f"Correct Answer: {question.correct_answer}\n"
        f"Explain why this is the correct answer."
    )

    try:
        openai_response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",  
                prompt=openai_prompt,
                max_tokens=150,  
                temperature=0.7  
            )

        openai_feedback = openai_response.choices[0].text.strip()
        feedback += f"\n\nExplanation: {openai_feedback}"

    except Exception as e:
        feedback += "\n\n(Note: Could not retrieve explanation from OpenAI.RateLimitError: You exceeded your current quota, please check your plan and billing details.)"

    return AnswerCheckResponse(
        question_text=request.question_text,
        selected_answer=", ".join(request.selected_answers),
        correct_answer=question.correct_answer,
        feedback=feedback
    )



from starlette.websockets import WebSocket, WebSocketDisconnect

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Client {client_id}: {data}")
    except WebSocketDisconnect:
        print(f"Client {client_id} disconnected")
    finally:
        await websocket.close(code=1000)  
