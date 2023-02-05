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
        <Row style={{padding: "10px 0px 0px 0px"}}>
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
          <p className="conty">Mon - Fri: 8am - 8pm</p>
          <p className="conty">Saturday: 9am - 7pm</p>
          </Col>
        </Row>
      </Container>
      <Container className="log">
        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <Form>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" />
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" />
            </Form>
          </Col>
        </Row>
        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <Form>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" />
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" name="subject" />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" name="message" rows={6} />
            </Form>
          </Col>
        </Row>
        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col style={{ padding: "0px 0px 0px 10px" }}>
            <ButtonGroup
              style={{ float: "right", padding: "0px 30px 0px 0px" }}
            >
              <Button
                varient="dark"
                style={{ margin: "0px 8px 0px 0px"}}
              >
                Submit
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
