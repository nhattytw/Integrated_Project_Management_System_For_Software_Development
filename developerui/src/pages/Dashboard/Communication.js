import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Table,
  Tab,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { Icon } from '@rsuite/icons';
import React, { useEffect } from "react";
import Overlay from "react-bootstrap";
import { Message, Nav } from "rsuite";
import NoticeIcon from "@rsuite/icons/Notice";
import TimeIcon from "@rsuite/icons/Time";
import EmailIcon from "@rsuite/icons/Email";
import { Context } from "../../Context/context";
import { useContext, useState } from "react";
import ContenetDisplay from "../../Components/ConentDisplay/ConentDisplay";
import { issues } from "../../API/Issues";
import SpeakerIcon from '@rsuite/icons/Speaker';
import CheckIcon from '@rsuite/icons/Check';
import MessageIcon from '@rsuite/icons/Message';

const CommunicationsNav = () => {
  const { communications, setCommunications } = useContext(Context);
  return (
    <Container>
      <Row>
        <Col>
          <Nav appearance="tabs">
          <Nav.Item
              icon={<SpeakerIcon />}
              onSelect={() => {
                setCommunications("active");
              }}
            >
              Acitve Issue
            </Nav.Item>
            <Nav.Item
              icon={<NoticeIcon />}
              onSelect={() => {
                setCommunications("ScheduledMeetings");
              }}
            >
              Scheduled Meetings
            </Nav.Item>
            <Nav.Item
              icon={<MessageIcon />}
              onSelect={() => {
                setCommunications("Issue");
              }}
            >
              New Issue
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

const ScheduledMeetings = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h4>Scheduled Meetings</h4>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Participant/s</th>
                <th>Start time</th>
                <th>Completion time</th>
                <th>date</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};


const Issue = () => {
  const States = ["Active", "Resolved", "Pending"];
  const handleStatusChange = (event) => {
    const { name, value } = event.target;
  };
  return (
    <Container>
      <Row>
        <Col>
          <h3>Raise Issue</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Issue</Form.Label>
          <Form.Control as="textarea"></Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Status</Form.Label>
          <Form.Select onChange={handleStatusChange} name="State">
            {States.map((state, index) => {
              return (
                <option key={state.value} value={index + 1}>
                  {state}
                </option>
              );
            })}
          </Form.Select>
        </Col>
      </Row>
      <Row style={{margin:'3px 0px 0px 0px'}}>
        <Col>
          <Button>Raise</Button>
        </Col>
      </Row>
    </Container>
  );
};

const ActiveIssues = ()=>{
  const States = ["Active", "Resolved", "Pending"];
  const handleStatusChange = (event) => {
    const { name, value } = event.target;
    
  };

  const setIssueresolved = (comments,resolvedIssue)=>{
      const acitveIssues= comments.filter(comment=>comment !== resolvedIssue)
      console.log(acitveIssues)
  }
  return(
    <React.Fragment>
      <Container>
        <Row>
            {issues.map((item,index)=>{
              return(
                  <Container>
                    <Row>
                      <Col xs={2}>
                      <h4>{item.project}
                      </h4>
                      </Col>
                      <Col xs={2}>
                      <Button style={{margin:'4px 0px 0px 10px',padding:'2px'}} ><Icon as={CheckIcon}></Icon>set resolved</Button>
                      
                      </Col>
                  
                      {item.comment.map((comment)=>{
                        
                        return(
                          <Container style={{margin:"0px 0px 0px 0px"}}>
                            <Row>
                              <Col>
                              <p>{comment}
                              {/*  */}
                           
                              </p>

                              </Col>
                            </Row>
                          </Container>
                        )
                      })}
                    </Row>
                    <Row>
                      <Col>
                        <Form.Control type="text" placeholder="Add comment" style={{margin:"4px 0px 0px 0px"}}></Form.Control>
                      </Col>
                      <Col>
                      <Button >post</Button></Col>
                    </Row>
                  </Container>
                  
                )
                
              })}
        </Row>
      </Container>
    </React.Fragment>

  )

}

const Communications = () => {
  const { Communications, setCommunication } = useContext(Context);
  const pages = {
    "ScheduledMeetings": ScheduledMeetings,
    "Issue": Issue,
    "active":ActiveIssues
  };

  return (
    <Container>
      <CommunicationsNav />
      <ContenetDisplay content={pages[Communications]}></ContenetDisplay>
    </Container>
  );
};
export default Communications;
