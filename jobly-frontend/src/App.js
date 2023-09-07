import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import JoblyApi from './components/api/api';
import UserContext from './components/hooks/UserContext';

import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import CompaniesList from './components/companies/CompaniesList';
import CompanyDetail from './components/companies/CompanyDetail'; 
import JobsList from './components/jobs/JobsList';
import UserProfile from './components/profile/UserProfile';
import NavBar from './components/NavBar';
import Home from './components/Home';

import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import useLocalStorage from './components/hooks/useLocalStorage'; 

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useLocalStorage('jobly-token', null); 

  useEffect(() => {
    if (token) {
      JoblyApi.token = token;
      const { username } = jwt_decode(token);
      JoblyApi.getCurrentUser(username).then(user => {
        setCurrentUser(user);
        setApplications(user.applications);
        setIsLoading(false); 
      });
    } else {
      setIsLoading(false);  
    }
  }, [token]);  

  const login = async (credentials) => {
    const token = await JoblyApi.login(credentials);
    setToken(token);
    return token;
  };

  const signup = async (data) => {
    const token = await JoblyApi.signup(data);
    setToken(token);
    return token;
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const applyToJob = async (id) => {
    if (currentUser) {
      await JoblyApi.applyToJob(currentUser.username, id);
      // Update the applications state after applying to a job
      setApplications(prevApplications => [...prevApplications, id]);
    }
  }

  const unapplyFromJob = async (id) => {
    if (currentUser) {
      await JoblyApi.unapplyToJob(currentUser.username, id);
      // Update the applications state after unapplying from a job
      setApplications(prevApplications => prevApplications.filter(jobId => jobId !== id));
    }
  };  

  useEffect(() => {
    if (token) {
      JoblyApi.token = token;
      const { username } = jwt_decode(token);
      JoblyApi.getCurrentUser(username).then(user => {
        setCurrentUser(user);
        setApplications(user.applications); 
      });
    }
  }, [token]);

  function setCurrentUserAndToken(user, token) {
    setCurrentUser(user);
    if (token) setToken(token);
  }

  return (
    <Router>
      <UserContext.Provider value={currentUser}>
      <NavBar logout={logout} />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<PublicRoute><LoginForm login={login} /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupForm signup={signup} /></PublicRoute>} />
        {/* Private routes */}
        <Route path="/jobs" element={<PrivateRoute isLoading={isLoading} ><JobsList applications={applications} applyToJob={applyToJob} /></PrivateRoute>} />
        <Route path="/companies" element={<PrivateRoute isLoading={isLoading} ><CompaniesList /></PrivateRoute>} />
        <Route path="/companies/:handle" element={<PrivateRoute isLoading={isLoading} ><CompanyDetail applications={applications} applyToJob={applyToJob} /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute isLoading={isLoading} ><UserProfile applications={applications} unapplyFromJob={unapplyFromJob} updateUser={setCurrentUserAndToken} /></PrivateRoute>} />

        <Route path="/" element={<Home />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
