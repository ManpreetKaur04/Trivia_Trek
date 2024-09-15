import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import ProtectedPage from './screens/Protected';
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import Questions from './Questions';
import Register from './screens/Register';
import Home from './screens/Home';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className="py-5">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/protected" element={<ProtectedPage />} />
              <Route path="/questionSet/:id" element={<Questions />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
