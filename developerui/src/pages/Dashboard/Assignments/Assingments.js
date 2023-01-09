import { AssignmentContext, Context } from "../../../Context/context";
import { Container, Col, Row, Form, Button, Table, Tab } from "react-bootstrap";
import { CheckTreePicker, Toggle } from "rsuite";
import { Nav } from "rsuite";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import PauseRoundIcon from "@rsuite/icons/PauseRound";
import PeoplesIcon from "@rsuite/icons/Peoples";
import { useContext, useState } from "react";
import ContenetDisplay from "../../../Components/ConentDisplay/ConentDisplay";
const AssignemtsNav = () => {
  const { Assignment, setAssignment } = useContext(Context);

  return (
    <Container>
      <Row>
        <Col>
          <Nav appearance="tabs">
          <Nav.Item
              icon={<PauseRoundIcon />}
              onSelect={() => {
                setAssignment("PendingAssignments");
              }}
            >
              Pending Assignments
            </Nav.Item>
            <Nav.Item
              icon={<CheckRoundIcon />}
              onSelect={() => {
                setAssignment("CompletedAssgnement");
              }}
            >
              Completed Assignments
            </Nav.Item>

          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

const PendingAssignments = () => {
  return (
    <Container>
    <Row>
      <Col>
        <h4>Completed task</h4>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Assigned Team</th>
              <th>Date Assigend</th>
              <th>Date Completed</th>
              <th></th>
            </tr>
          </thead>
        </Table>
      </Col>
    </Row>
  </Container>
  )
};
const CompletedAssignments = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h4>Completed task</h4>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Assigned Team</th>
                <th>Date Assigend</th>
                <th>Date Completed</th>
                <th>schedule</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
const pages = {
  "PendingAssignments": PendingAssignments,
  "CompletedAssgnement": CompletedAssignments,
};

const Assignments = () => {
  const { Assignment, setAssignment } = useContext(Context);
  return (
    <>
      <AssignemtsNav />
      <ContenetDisplay content={pages[Assignment]}></ContenetDisplay>
    </>
  );
};

export default Assignments;
