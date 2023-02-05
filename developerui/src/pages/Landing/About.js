import { Container, Col, Row } from "react-bootstrap";
import { NavBar } from "../../Components/nav/nav";
import team from "./team.jpg";

export default function About() {
  return (
    <div className="font-link">
      <NavBar />
      <Container>
        <Row>
          <Col>
            <img src={team} alt="team" style={{ width: "100%" }} />
            <h1 className="hhh1">Our Story</h1>
          </Col>
        </Row>
        <Row>
          <p className="texty">
            We are a group of Computer Science graduates from HiLCoE school of
            Computer Science and Technology making our way through the Tech
            Industry by creating project managment solutions, for web
            development companies.
          </p>
        </Row>
      </Container>
    </div>
  );
}
