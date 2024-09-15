import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from './UserDashboard';

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/auth/verify-token', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);

  return <div><UserDashboard /></div>;
}

export default ProtectedPage;
