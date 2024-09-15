import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate for navigation

function Questions() {
  const { id } = useParams();
  const navigate = useNavigate();  // Initialize the navigation hook
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const[alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/{id}");
  
    socket.onmessage = (event) => {
      const message = event.data;
      setFeedback(message);  // Assuming feedback is received through WebSocket
    };
  
    return () => {
      socket.close();
    };
  }, [id]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/quiz/${id}`);
        const data = await response.json();
        setQuestions(data.questions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prevSelected) =>
      prevSelected.includes(answer)
        ? prevSelected.filter((a) => a !== answer) // Deselect if already selected
        : [...prevSelected, answer] // Add if not selected
    );
  };

  const handleSubmit = async () => {
    if (selectedAnswers.length === 0) {
      setAlertMessage("Please select at least one answer before submitting.");
      return;
    }
    
    const currentQuestion = questions[currentQuestionIndex];
  
    try {
      const response = await fetch("http://localhost:8000/check_answer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_text: currentQuestion.question_text,
          selected_answers: selectedAnswers,
        }),
      });
  
      const data = await response.json();
      console.log("Received feedback from backend:", data.feedback);
  
      setFeedback(data.feedback);
      setShowFeedback(true);
    } catch (error) {
      setAlertMessage("Error checking answer:", error);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswers([]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setFeedback(""); // Reset feedback for the next question
    } else {
      // Instead of confirm, show the success alert with a button
      setAlertMessage(`
        <strong>Well done!</strong> You've completed the quiz! 
        <a href="http://localhost:3000/protected" class="alert-link">Try a different subject</a>.
      `);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setFeedback(""); // Reset feedback when moving back
      setSelectedAnswers([]); // Reset the answers when going to previous question
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!questions || questions.length === 0) {
    return <div>No questions available</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-4">
      <h2>{currentQuestion.question_text}</h2>
      {alertMessage && (
        <div className="alert alert-dismissible alert-success">
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlertMessage("")}></button>
          <div dangerouslySetInnerHTML={{ __html: alertMessage }} />
        </div>
      )}
      <div className="form-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="optionA"
            value={currentQuestion.option_a}
            checked={selectedAnswers.includes(currentQuestion.option_a)}
            onChange={() => handleAnswerSelection(currentQuestion.option_a)}
          />
          <label className="form-check-label" htmlFor="optionA">
            {currentQuestion.option_a}
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="optionB"
            value={currentQuestion.option_b}
            checked={selectedAnswers.includes(currentQuestion.option_b)}
            onChange={() => handleAnswerSelection(currentQuestion.option_b)}
          />
          <label className="form-check-label" htmlFor="optionB">
            {currentQuestion.option_b}
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="optionC"
            value={currentQuestion.option_c}
            checked={selectedAnswers.includes(currentQuestion.option_c)}
            onChange={() => handleAnswerSelection(currentQuestion.option_c)}
          />
          <label className="form-check-label" htmlFor="optionC">
            {currentQuestion.option_c}
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="optionD"
            value={currentQuestion.option_d}
            checked={selectedAnswers.includes(currentQuestion.option_d)}
            onChange={() => handleAnswerSelection(currentQuestion.option_d)}
          />
          <label className="form-check-label" htmlFor="optionD">
            {currentQuestion.option_d}
          </label>
        </div>
      </div>

      <button className="btn btn-outline-primary my-3" onClick={handleSubmit}>
        Submit Answer
      </button>

      {showFeedback && (
        <div className="form-group mt-4 my-3">
          <label htmlFor="feedbackTextarea" className="form-label">Feedback</label>
          <textarea
            className="form-control text-white bg-primary"
            id="feedbackTextarea"
            rows="3"
            value={feedback}
            readOnly
          />
        </div>
      )}

      <button className="btn btn-outline-primary my-3" onClick={handlePreviousQuestion}>
        Previous Question
      </button>
      <button className="btn btn-outline-primary my-3" onClick={handleNextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default Questions;
