import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../hooks/UserContext';

function PrivateRoute({ children, isLoading }) {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate("/");  
    }
  }, [currentUser, navigate, isLoading]);

  if (isLoading) return null;  
  if (!currentUser) return null; 

  return children;
}

export default PrivateRoute;
