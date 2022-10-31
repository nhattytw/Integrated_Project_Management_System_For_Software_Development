import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" style={{height:"45px"}}>
      
        <Container className='left'>
        <Navbar.Brand href="#home">procurat.io</Navbar.Brand>
          <Nav className="me-auto justify-content-end" style={{width:"100%"}} >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#home">Login</Nav.Link>
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

export default NavBar;



