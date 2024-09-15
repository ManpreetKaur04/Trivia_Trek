import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container" style={{ textAlign: "center" }} >
      <div className="logo-container" ></div>
      <div className="app-description">
      <h1>Welcome to Trivia Trek</h1>
        <h4><p>A good quiz app is user-friendly and provides a good understanding between the user and the app. It should include answers to questions, query solving, and a interactive chatbot</p>
        <p>Use the Quizizz app to learn anything, anywhere. You can study on your own or engage with valid feedbacks.</p></h4><hr></hr>
        <p>Register now to get started, or log in to continue your journey.</p>
      </div>
      <div className="auth-buttons">
        <Link to="/auth/register" className="btn my-3"><button type="button" className="btn btn-outline-primary">Register</button></Link>
        <Link to="/login" className="btn my-3"><button type="button" className="btn btn-outline-primary">Login</button></Link>
      </div>
    </div>
  );
};


export default Home;
