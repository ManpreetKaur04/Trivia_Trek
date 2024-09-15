Question Interaction Chatbot

Overview

This project involves creating a web application where users can interact with preloaded question sets stored in a database. Users can select a question set, answer questions, and receive real-time feedback and guidance. The application leverages FastAPI, React.js, MongoDB, Redis, and WebSockets for a seamless user experience.

Technical Stack

Backend: FastAPI (Python)
Database: MongoDB (preferred) or PostgreSQL
Real-Time Communication: WebSockets
Session Management: Redis
Feedback & Answer Checking: OpenAI API
Frontend: React.js
Setup and Installation

Backend
Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/question-interaction-chatbot.git
cd question-interaction-chatbot
Create a Virtual Environment
bash
Copy code
python -m venv venv
source venv/bin/activate
Install Dependencies
bash
Copy code
pip install -r requirements.txt
Set Up Environment Variables
Create a .env file in the root directory with the following content:

dotenv
Copy code
POSTGRESQL_URI=<your_postgresql_uri>
REDIS_URL=<your_redis_url>
OPENAI_API_KEY=<your_openai_api_key>
Initialize the Database
Preload question sets into MongoDB. Ensure you have the correct structure for the questions, including question_text, answer_options, correct_answer, and hints.
Run the Backend
bash
Copy code
uvicorn main:app --reload
Frontend
Navigate to the Frontend Directory
bash
Copy code
cd frontend
Install Dependencies
bash
Copy code
npm install
Start the Development Server
bash
Copy code
npm start
