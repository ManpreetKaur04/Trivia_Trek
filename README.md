Question Interaction Chatbot

Overview:
This project involves creating a web application where users can interact with preloaded question sets stored in a database. Users can select a question set, answer questions, and receive real-time feedback and guidance. The application leverages FastAPI, React.js, PostgreSQL, Redis, and WebSockets for a seamless user experience.

Technical Stack:
-Backend: FastAPI (Python)
-Database: PostgreSQL
-Real-Time Communication: WebSockets
-Session Management: Redis
-Feedback & Answer Checking: OpenAI API
-Frontend: React.js


Setup and Installation:
-Clone the Repository
-Create a Virtual Environment
-pip install -r requirements.txt
-Set Up Environment Variables
-Create a .env file in the root directory with the following content:
-POSTGRESQL_URI=<your_postgresql_uri>
-REDIS_URL=<your_redis_url>
-OPENAI_API_KEY=<your_openai_api_key>
-Initialize the Database


Common Errors and New Learnings:
1. You need to have a paid OPENAI account to acesess its services of APIs.
2. Make sure you  have all the dependencies installed and imported correctly.


<img width="1440" alt="Homepage" src="https://github.com/user-attachments/assets/8133f782-70a4-4e52-8e0c-97c64140c9fa">
<img width="1440" alt="register and authenticate " src="https://github.com/user-attachments/assets/ff1d8b16-d8aa-424c-80ea-7c2accbf4d42">
<img width="1440" alt="User's dashboard" src="https://github.com/user-attachments/assets/849a5802-9f22-42d4-a5b3-ec40d7226ec9"><img width="1440" alt="First question " src="https://github.com/user-attachments/assets/61a92c39-1e4b-4656-b494-e4fc21fe1d78"><img width="1440" alt="last question" src="https://github.com/user-attachments/assets/fdc13523-be29-47fe-b2a5-9f66596fd267">


