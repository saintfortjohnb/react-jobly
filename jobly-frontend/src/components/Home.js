import React, { useContext } from 'react';
import { Container, Button, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserContext from './hooks/UserContext';

const Home = () => {
    const user = useContext(UserContext);
    return (
        <Container className="blurry-background mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Welcome to Jobly, {user ? <Badge color="secondary" className="ml-3">{user.username}</Badge> : "!"}!</h1>
                <p className="lead">Find your dream job today.</p>
                <hr className="my-2" />
                {user ? (
                    <>
                        <p>Click below to explore the latest jobs and companies!</p>
                        <Button color="primary" tag={Link} to="/jobs" className="m-2">Explore Jobs</Button>
                        <Button color="success" tag={Link} to="/companies" className="m-2">Explore Companies</Button>
                    </>
                ) : (
                    <>
                        <p>Join us today to unlock your potential!</p>
                        <Button color="primary" tag={Link} to="/login" className="m-2">Login</Button>
                        <Button color="success" tag={Link} to="/signup" className="m-2">Signup</Button>
                    </>
                )}
            </div>
        </Container>
    );
};

export default Home;
