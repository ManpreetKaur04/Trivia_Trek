import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const user = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      setLoading(false);

      if (response.ok) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000); 
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Registration failed!');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="has-success">
          <label className="form-label mt-4" for="inputValid">Username:</label>
          <input type="text" className="form-control is-valid"  value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label className="form-label mt-4" for="inputValid">Password:</label>
          <input className="form-control is-valid"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <label className="form-label mt-4" for="inputValid">Confirm Password:</label>
          <input className="form-control is-valid"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-success my-3 p-3 rounded" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  );
}

export default Register;
