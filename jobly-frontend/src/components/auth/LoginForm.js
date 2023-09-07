import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import LoadingSpinner from '../hooks/LoadingSpinner';

const LoginForm = ({ login }) => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);  // State to handle loading spinner

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);  // Activate the loading spinner before sending the request
    try {
      const token = await login(formData);
      if (token) {
        navigate('/');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);  // Deactivate the loading spinner after receiving a response or error
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  return (
    isLoading
      ? <LoadingSpinner />
      : (
        <Container className='blurry-background' style={{ maxWidth: '400px', marginTop: '50px' }}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input 
                type="text" 
                name="username" 
                id="username" 
                value={formData.username} 
                onChange={handleChange} 
                autoComplete="username" 
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input 
                type="password" 
                name="password" 
                id="password" 
                value={formData.password} 
                onChange={handleChange} 
                autoComplete="current-password" 
                required 
              />
            </FormGroup>
            <Button color="primary" block>Login</Button>
          </Form>
        </Container>
      )
  );
};

export default LoginForm;
