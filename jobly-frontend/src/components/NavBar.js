import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Navbar, 
  Nav as NavBar, 
  NavItem, 
  NavbarBrand
} from 'reactstrap';
import UserContext from './hooks/UserContext';

function NavigationBar(props) {
    const location = useLocation();
    const user = useContext(UserContext);

    const isActive = (path) => location.pathname === path;

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={Link} to="/">Jobly</NavbarBrand>
          <NavBar navbar className="ml-auto">
              {user && (
                <>
                  <NavItem>
                    <Link className={isActive("/companies") ? "nav-link active" : "nav-link"} to="/companies">Companies</Link>
                  </NavItem>
                  <NavItem>
                    <Link className={isActive("/jobs") ? "nav-link active" : "nav-link"} to="/jobs">Jobs</Link>
                  </NavItem>
                </>
              )}
              {user ? (
                <>
                  <NavItem>
                    <Link className={isActive("/profile") ? "nav-link active" : "nav-link"} to="/profile">Profile</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" onClick={props.logout} to="#">Logout: {user.username}</Link>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <Link className={isActive("/login") ? "nav-link active" : "nav-link"} to="/login">Login</Link>
                  </NavItem>
                  <NavItem>
                    <Link className={isActive("/signup") ? "nav-link active" : "nav-link"} to="/signup">Signup</Link>
                  </NavItem>
                </>
              )}
          </NavBar>
        </Navbar>
      </div>
    );
}

export default NavigationBar;
