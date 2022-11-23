import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from "react-router-dom";
import { LoginPage } from '../login/login';
import {LinkContainer} from 'react-router-bootstrap'
export const NavBar =()=> {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" style={{height:"45px"}}>
      
        <Container className='left'>
        <Navbar.Brand to="/">procurat.io</Navbar.Brand>
          <Nav className="me-auto justify-content-end" style={{width:"100%"}} >
            
          <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
           <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
            <Nav.Link href="#features">Register</Nav.Link>
            <Nav.Link href="#pricing">About</Nav.Link>
            <Nav.Link href="#pricing">Services</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}





