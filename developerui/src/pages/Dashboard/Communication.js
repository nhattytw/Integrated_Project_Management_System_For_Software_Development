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
import Overlay from "react-bootstrap";
import { Nav } from "rsuite";
import NoticeIcon from "@rsuite/icons/Notice";
import TimeIcon from "@rsuite/icons/Time";
import EmailIcon from "@rsuite/icons/Email";
import { Context } from "../../Context/context";
import { useContext, useState } from "react";
import ContenetDisplay from "../../Components/ConentDisplay/ConentDisplay";

const CommunicationsNav = () => {
  const { communications, setCommunications } = useContext(Context);
  return (
    <Container>
      <Row>
        <Col>
          <Nav appearance="tabs">
            <Nav.Item
              icon={<NoticeIcon />}
              onSelect={() => {
                setCommunications("ScheduledMeetings");
              }}
            >
              Scheduled Meetings
            </Nav.Item>
            <Nav.Item
              icon={<EmailIcon />}
              onSelect={() => {
                setCommunications("Issues");
              }}
            >
              Issues
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
            <Form.Label>Issue</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Posted By</Form.Label>
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
      <Row>
        <Col>
          <Button>Raise</Button>
        </Col>
      </Row>
    </Container>
  );
};

const Communications = () => {
  const { Communications, setCommunication } = useContext(Context);
  const pages = {
    ScheduledMeetings: ScheduledMeetings,
    Issue: Issue,
  };

  return (
    <Container>
      <CommunicationsNav />
      <ContenetDisplay content={pages[Communications]}></ContenetDisplay>
    </Container>
  );
};
export default Communications;
