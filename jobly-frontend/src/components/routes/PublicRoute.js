import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../hooks/UserContext';
import LoadingSpinner from '../hooks/LoadingSpinner';

function PublicRoute({ children, isLoading }) {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && currentUser) {
      navigate("/"); 
    }
  }, [currentUser, navigate, isLoading]);

  if (isLoading) return <LoadingSpinner />;  
  if (currentUser) return null;

  return children;
}

export default PublicRoute;
