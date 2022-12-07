import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import DashboardIcon from '@rsuite/icons/Dashboard';
import PageIcon from "@rsuite/icons/Page"//for payroll page to be removed
import ProjectIcon from "@rsuite/icons/Project" //for project page
import SentToUserIcon from "@rsuite/icons/SentToUser" //for communications page
import PinIcon from "@rsuite/icons/Pin";
import "rsuite/dist/rsuite.min.css";
import Projects from './Projects';
import React, { useEffect } from 'react';
import AdminPanel from './AdminPanel';
import Assignments from './Assignments/Assingments';
import Communications from './Communication';
import { useState } from 'react';

// add first best solution  
// page navigation pliminary logic
const pages = {
  "Assignments":<Assignments/>,
  "AdminPanel": <AdminPanel />,
  "Projects":<Projects />,
  "Communication":<Communications />,
  

}


const PageDisplay = (page)=>{
   console.log(page)
}
const headerStyles = {
    padding: 18,
    fontSize: 20,
    height: 60,
    background: 'rgba(66,105,158)',
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
    const [page,SetPage] = useState("AdminPanel")
    const [expand, setExpand] = React.useState(true);
    return (
      <div className="show-fake-browser sidebar-page"   style={{Position:"sticky"}}>
        <Container  >
          <Sidebar
            style={{ display: 'flex', flexDirection: 'column' }}
            width={expand ? 260 : 56}
            collapsible
            className="Navcontainer"
          >
            <Sidenav.Header > 
              <div style={headerStyles}>
                <span style={{ marginLeft: 12 }}> procurat.io</span>
              </div>
            </Sidenav.Header>
            <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
              <Sidenav.Body >
                <Nav>
                  <Nav.Item eventKey="1"  icon={<DashboardIcon />} 
                   onClick={()=>{SetPage("AdminPanel")}}
                  >
                    Dashboard
                  </Nav.Item>
                  <Nav.Item eventKey="2" icon={<ProjectIcon />} 
                  onClick={()=>{SetPage("Projects")}}
                  >
                    Project
                  </Nav.Item>
                 
                    <Nav.Item eventKey="3-1"
                    icon={<PageIcon />}
                    >
                      Payroll
                    </Nav.Item>
                    <Nav.Item eventKey="3-2"
                    icon={<PinIcon />}
                    onClick={()=>{SetPage("Assignments")}}
                    >Assignments
                    </Nav.Item>
                    <Nav.Item 
                    eventKey="4-1" 
                    icon={<SentToUserIcon />}
                    onClick={()=>{SetPage("Communication")}}
                    >
                      Communication
                        
                    </Nav.Item>

                  
                </Nav>
              </Sidenav.Body>
            </Sidenav>
            <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
          </Sidebar>
  
          <Container > 
            <Content>
               {pages[page]}
            </Content>
           
          </Container>
        </Container>
      </div>
    )
}
export default Dashboard;