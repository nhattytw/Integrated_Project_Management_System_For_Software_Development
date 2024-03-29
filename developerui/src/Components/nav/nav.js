import {Nav as BootNav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { LoginPage } from '../../pages/login/login';
import {LinkContainer} from 'react-router-bootstrap'
import {Container,Col,Row} from 'react-bootstrap'
 import {Nav} from 'rsuite'
import AdvancedAnalyticsIcon from '@rsuite/icons/AdvancedAnalytics' ;
import PlusIcon from '@rsuite/icons/Plus';
import BarChartIcon from '@rsuite/icons/BarChart';
import ListIcon from '@rsuite/icons/List';
import TimeIcon from '@rsuite/icons/Time';
import CheckRoundIcon from '@rsuite/icons/CheckRound'; 
import PauseRoundIcon from '@rsuite/icons/PauseRound';
import PeoplesIcon from '@rsuite/icons/Peoples';



 const NavBar =()=> {
  return (
    <div className='font-link'>
      <Navbar bg="dark" variant="dark" sticky="top" style={{height:"45px"}}>
      
        <Container className='left'>
        <Navbar.Brand to="/">procurat.io</Navbar.Brand>
          <BootNav className="me-auto justify-content-end" style={{width:"100%"}} >
            
          <LinkContainer to="/"><BootNav.Link >Home</BootNav.Link ></LinkContainer>
           <LinkContainer to="/login"><BootNav.Link >Login</BootNav.Link></LinkContainer>
           <LinkContainer to="/Registration"><BootNav.Link >Registration</BootNav.Link ></LinkContainer>
           <LinkContainer to="/About"><BootNav.Link >About</BootNav.Link ></LinkContainer>
           <LinkContainer to="/Contact"><BootNav.Link >Contact</BootNav.Link ></LinkContainer>
          </BootNav>
        </Container>
      </Navbar>
    </div>
  );
}
export { NavBar  }





