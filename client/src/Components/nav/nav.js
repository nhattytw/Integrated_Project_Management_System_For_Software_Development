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
const ProjectNav = ()=>
{
  const ChangePage = (props)=>{
      return props.page;
  }
  return(
<Container>
<Row>
    <Col>
        <Nav appearance='tabs' >
            <Nav.Item icon={<AdvancedAnalyticsIcon/>} >Active Projects</Nav.Item>
            <Nav.Item icon={<PlusIcon />}>Create Project</Nav.Item>
            <Nav.Item icon={<BarChartIcon />}>Project Status</Nav.Item>
            <Nav.Item icon={<ListIcon />}>Create WBS</Nav.Item>
            <Nav.Item icon={<TimeIcon />}>Schedule </Nav.Item>
        </Nav>
    </Col>
</Row>
</Container>

  )
}
const AssignemtsNav=()=>{
  return(
<Container>
<Row>
    <Col>
        <Nav appearance='tabs' >
            <Nav.Item icon={<PeoplesIcon/>} >Asign task to team</Nav.Item>
            <Nav.Item icon={<CheckRoundIcon />}>Completed </Nav.Item>
            <Nav.Item icon={<PauseRoundIcon />}>Pending</Nav.Item>

        </Nav>
    </Col>
</Row>
</Container>
  )
}
 const NavBar =()=> {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" style={{height:"45px"}}>
      
        <Container className='left'>
        <Navbar.Brand to="/">procurat.io</Navbar.Brand>
          <BootNav className="me-auto justify-content-end" style={{width:"100%"}} >
            
          <LinkContainer to="/"><BootNav.Link >Home</BootNav.Link ></LinkContainer>
           <LinkContainer to="/login"><BootNav.Link >Login</BootNav.Link></LinkContainer>
           <LinkContainer to="/Registration"><BootNav.Link >Registration</BootNav.Link ></LinkContainer>
            <BootNav.Link href="#pricing">About</BootNav.Link>
            <BootNav.Link href="#pricing">Services</BootNav.Link>
            <BootNav.Link href="#pricing">Contact</BootNav.Link>
          </BootNav>
        </Container>
      </Navbar>
    </>
  );
}
export { NavBar,ProjectNav,AssignemtsNav }





