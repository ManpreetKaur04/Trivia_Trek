from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base, engine
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)


class Question(Base):
    __tablename__ = 'questions'
    
    id = Column(Integer, primary_key=True, index=True)
    question_set_id = Column(Integer, ForeignKey('question_set.id'))
    question_text = Column(String)
    option_a = Column(String)
    option_b = Column(String)
    option_c = Column(String)
    option_d = Column(String)
    correct_answer = Column(String)
    
    question_set = relationship("QuestionSet", back_populates="questions")
    
class QuestionSet(Base):
    __tablename__ = 'question_set'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    
    questions = relationship("Question", back_populates="question_set")
    
User.metadata.create_all(bind=engine)
