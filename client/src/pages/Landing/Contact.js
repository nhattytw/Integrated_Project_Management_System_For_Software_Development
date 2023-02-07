import {
  Container,
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { NavBar } from "../../Components/nav/nav";
import contact from "./contact.png";

export default function Contact() {
  return (
    <div className="font-link">
      <NavBar />
      <Container>
        <Row>
          <Col>
            <img src={contact} alt="team" style={{ width: "100%" }} />
          </Col>
        </Row>
      </Container>
      <Container className="log">
        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <h4 className="texty">Our Offices</h4>
            <p className="conty">P.O. Box  : 25304/1000</p>
            <p className="conty">Addis Ababa, Ethiopia</p>
          </Col>
          <Col>
            <h4 className="texty">Customer Service</h4>
            <p className="conty">+251 111 559769</p>
            <p className="conty">info@procurat.io</p>
          </Col>
          <Col>
            <h4 className="texty">Opening Hours</h4>
            <p className="conty">Mon - Fri: 8:30am - 8pm</p>
            <p className="conty">Saturday: 9am - 7pm</p>
          </Col>
        </Row>
      </Container>

    </div>
  );
}
