import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

const SignupForm = ({ signup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '', email: '', firstName: '', lastName: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = await signup(formData); 
      if (token) {
        navigate('/'); 
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  return (
    <Container className="blurry-background" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h3 className="text-center mb-4">Signup</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" value={formData.username} onChange={handleChange} autoComplete="username" required />
        </FormGroup>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input 
            type="password" 
            name="password" 
            id="password" 
            value={formData.password} 
            onChange={handleChange} 
            autoComplete="current-password" required />
        </FormGroup>
        <Button color="success" block>Signup</Button>
      </Form>
    </Container>
  );
};

export default SignupForm;
