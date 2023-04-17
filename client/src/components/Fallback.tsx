import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Fallback = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/error');
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default Fallback;