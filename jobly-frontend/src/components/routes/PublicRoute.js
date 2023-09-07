import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../hooks/UserContext';

function PublicRoute({ children }) {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/"); 
    }
  }, [currentUser, navigate]);

  if (currentUser) return null;

  return children;
}

export default PublicRoute;