import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import DashboardIcon from '@rsuite/icons/Dashboard';
import ProjectIcon from "@rsuite/icons/Project" //for project page
import SentToUserIcon from "@rsuite/icons/SentToUser" //for communications page
import PinIcon from "@rsuite/icons/Pin";
import PeoplesMapIcon from '@rsuite/icons/PeoplesMap';
import "rsuite/dist/rsuite.min.css";
import Projects from './Projects';
import React, { useEffect } from 'react';
import AdminPanel from './AdminPanel';
import Assignments from './Assignments/Assingments';
import Communications from './Communication';
import SettingPage from './Setting';
import { useState } from 'react';
import Teams from './Teams';

// add first best solution  
// page navigation pliminary logic
const pages = {
  "Assignments": <Assignments />,
  "AdminPanel": <AdminPanel />,
  "Projects": <Projects />,
  "Communication": <Communications />,
  "Setting":<SettingPage />,
  "Teams":<Teams />
}



const height = 100;
const headerStyles = {
  padding: 18,
  fontSize: 20,
  height: 60,
  background: 'rgba(66,105,158)',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const handleSignout = () => {
  localStorage.clear()
  // User react router to go here
  window.location.href = '/'  // User react router to go here

}


const NavToggle = ({ expand, onChange }) => {
 
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          icon={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}

        >
          <Nav.Item>Help</Nav.Item>

          <Nav.Item
            onClick={handleSignout}
          >
            Sign out
          </Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar >
  )
}

const Dashboard = () => {
  const [page, SetPage] = useState("AdminPanel")
  const [expand, setExpand] = React.useState(true);
  return (
    <div className="show-fake-browser sidebar-page" >
      <Container  >
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column', position: "sticky !important" ,backgroundColor:"rgba(66,105,158)"}}
          width={expand ? 260 : 56}
          collapsible
          className="Navcontainer"
        

        >
          <Sidenav.Header >
            <div style={headerStyles}>
              <span style={{ display: 'flex', flexDirection: 'column', position: "sticky !important", marginLeft: 12 }}> procurat.io  
              
              </span>
             
            </div>
          </Sidenav.Header>
            <hr style={{border:"2px solid #fff"}}/  >
          <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle"  style={{color:"white"}}>
            <Sidenav.Body style={{color:"white"}}>
              <Nav style={{color:"white"}}>
                <Nav.Item eventKey="1" icon={<DashboardIcon />}
                  onClick={() => { SetPage("AdminPanel") }}
                  style={{color:"white"}}
                  
                  className='NavItem'
                >
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<ProjectIcon />}
                  onClick={() => { SetPage("Projects") }}
                  className='NavItem'
                >
                  Project
                </Nav.Item>

                <Nav.Item eventKey="3-1"
                  icon={<PeoplesMapIcon />}
                  onClick={() => { SetPage("Teams")}}
                  className='NavItem'
                >
                  Teams
                </Nav.Item>
                <Nav.Item eventKey="3-2"
                  icon={<PinIcon />}
                  className='NavItem'
                  onClick={() => { SetPage("Assignments") }}
                >Assignments
                </Nav.Item>
                <Nav.Item
                  eventKey="4-1"
                  icon={<SentToUserIcon />}
                  onClick={() => { SetPage("Communication") }}
                  className='NavItem'
                >
                  Communication

                </Nav.Item>
                <Nav.Item
                  eventKey="4-1"
                  icon={<CogIcon />}
                  onClick={() => { SetPage("Setting") }}
                  className='NavItem'
                >
                  Setting

                </Nav.Item>

              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Container style={{minHeight:"100vh",maxHeight:"fit-content"}}>
          <Content>
            {pages[page]}
          </Content>

        </Container>
      </Container>
    </div>
  )
}
export default Dashboard;