import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import JoblyApi from '../api/api';
import UserContext from '../hooks/UserContext';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import UserApplications from './UserApplications';

function UserProfile({ updateUser, applications, unapplyFromJob }) {
    const currentUser = useContext(UserContext);
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await JoblyApi.saveProfile(currentUser.username, formData);
            updateUser(updatedUser, JoblyApi.token);
            navigate('/');
        } catch (errors) {
            console.error("Failed to update profile:", errors);
        }
    };

    useEffect(() => {
        setFormData({
            firstName: currentUser.firstName || '',
            lastName: currentUser.lastName || '',
            email: currentUser.email || ''
        });
    }, [currentUser]);    

    return (
        <Container className="blurry-background mt-5" style={{ maxWidth: '800px'}}>
            <h3>Edit Profile</h3>
            <Form onSubmit={handleSubmit}>
                
                <FormGroup>
                    <Label for="firstName">First Name:</Label>
                    <Input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="lastName">Last Name:</Label>
                    <Input 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email:</Label>
                    <Input 
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormGroup>

                <Button color="primary" type="submit">Save Changes</Button>
            </Form>
            <UserApplications applications={applications} unapplyFromJob={unapplyFromJob} />
        </Container>
    );
}


export default UserProfile;
