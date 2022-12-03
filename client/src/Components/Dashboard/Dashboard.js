import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import { LinkContainer } from 'react-router-bootstrap';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import PageIcon from "@rsuite/icons/Page"//for payroll page
import ProjectIcon from "@rsuite/icons/Project" //for project page
import SentToUserIcon from "@rsuite/icons/SentToUser" //for communications page
import PinIcon from "@rsuite/icons/Pin";

import Projects from './Projects';
import React from 'react';

const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };
  
  
  const NavToggle = ({ expand, onChange }) => {
    return (
      <Navbar appearance="subtle" className="nav-toggle">
        <Nav>
          <Nav.Menu
            noCaret
            placement="topStart"
            trigger="click"
            icon ={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}
            
          >
            <Nav.Item>Help</Nav.Item>
            <Nav.Item>Settings</Nav.Item>
            <Nav.Item>Sign out</Nav.Item>
          </Nav.Menu>
        </Nav>
  
        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
          </Nav.Item>
        </Nav>
      </Navbar>
    )
  }
const Dashboard = ()=>{
    const [expand, setExpand] = React.useState(true);
    return (
      <div className="show-fake-browser sidebar-page">
        <Container>
          <Sidebar
            style={{ display: 'flex', flexDirection: 'column' }}
            width={expand ? 260 : 56}
            collapsible
          >
            <Sidenav.Header>
              <div style={headerStyles}>
                <span style={{ marginLeft: 12 }}> procurat.io</span>
              </div>
            </Sidenav.Header>
            <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
              <Sidenav.Body>
                <Nav>
                  <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                    Dashboard
                  </Nav.Item>
                  <Nav.Item eventKey="2" icon={<ProjectIcon />}>
                    Project
                  </Nav.Item>
                 
                    <Nav.Item eventKey="3-1"
                    icon={<PageIcon />}
                    >payroll
                    </Nav.Item>
                    <Nav.Item eventKey="3-2"
                    icon={<PinIcon />}
                    >Assignments
                    </Nav.Item>
                    {/* <Nav.Item eventKey="3-2">Devices</Nav.Item>
                    <Nav.Item eventKey="3-3">Brand</Nav.Item>
                    <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                    <Nav.Item eventKey="3-5">Visit Depth</Nav.Item> */}
                    
                 
                
                    <Nav.Item 
                    eventKey="4-1" 
                    icon={<SentToUserIcon />}
                    >
                        communication
                        
                    </Nav.Item>

                  
                </Nav>
              </Sidenav.Body>
            </Sidenav>
            <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
          </Sidebar>
  
          <Container>
            <Content>
                <Projects />
            </Content>
          </Container>
        </Container>
      </div>
    )
}
export default Dashboard;