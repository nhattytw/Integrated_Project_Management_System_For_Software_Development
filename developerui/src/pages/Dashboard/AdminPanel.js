import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import "../../Styles/dashboard.css";
import { ProjectBudgetData } from "../../API/Budgetdata";
import { teams } from "../../API/Teams";
import { assignments } from "../../API/Assignments";
import { issues } from "../../API/Issues";

const MeetingSummary = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Meeting with Front End Team</Card.Title>
              <Card.Text>
                We will have a meeting regarding the design and analysis of the
                new project for our new clients Ahadu Printing
                <h5>Date: 10/01/23</h5>
                <h5>Time: 10:30 Am</h5>
                <h5>Participating Team: Front End Team</h5>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Meeting with Back End Team</Card.Title>
              <Card.Text>
                We will have a meeting regarding the database design and
                implementaion of the new project for our new clients Ahadu
                Printing
                <h5>Date: 15/01/23</h5>
                <h5>Time: 9:30 Am</h5>
                <h5>Participating Team: Back End Team</h5>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Meeting with Ahadu Printing</Card.Title>
              <Card.Text>
                Onboarding session with new clients to asses their needs and the
                system functionalities they require
                <h5>Date: 5/01/23</h5>
                <h5>Time: 11:00 Am</h5>
                <h5>Participating Team: Team 1</h5>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const WorkStatus = () => {
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <h3>Active Assignments</h3>
        </Col>
        <Col xs={6}>
          <h3>issues</h3>
          {issues.map((issue) => {
            return (
              <>
                <h6>{issue.project}</h6>
                <ul>
                  {issue.issue.map((i) => {
                    return <li>{i}</li>;
                  })}
                </ul>
              </>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

const Parent = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>Dashboard</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <MeetingSummary />
        </Col>
      </Row>

      <Row>
        <Col>
          <WorkStatus />
        </Col>
      </Row>
    </Container>
  );
};
const AdminPanel = () => {
  return (
    <>
      <Parent />
    </>
  );
};
export default AdminPanel;
