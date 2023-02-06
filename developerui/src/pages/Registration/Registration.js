import {
  Container,
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { NavBar } from "../../Components/nav/nav";
import { useState, useEffect } from "react";
// import { renderMatches } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function RegistrationPage() {
  const base_url = "http://localhost:9000/api";

  const Positions = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Mobile Developer",
  ];

  const [agree, setAgree] = useState(false);
  const [dateState, setDateState] = useState(new Date());

  const handleChecked = (event) => {
    setAgree(event.target.checked);
  };

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    dob: dateState,
    phoneNumber: "",
    email: "",
    userName: "",
    password: "",
    position: "Frontend Developer",
    gitHubAccount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    var formBody = JSON.stringify(state);

    try {
      const response = await fetch(base_url + `/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: formBody,
      });
      const data = await response.json();

      if (data.message === "User Created") {
        handleCancel();
        setMessage("Registration successful!");
        setVariant("success");
        setShow(true);

        window.open("/login", "_self");
      } else {
        setMessage(data.message);
        setVariant("danger");
        setShow(true);
      }

      setTimeout(() => {
        setShow(false);
      }, "3000");
    } catch (error) {
      setMessage(error.message);
      setVariant("danger");
      setShow(true);
    }
  };

  const handleCancel = () => {
    setState({
      ...state,
      firstName: "",
      lastName: "",
      dob: dateState,
      phoneNumber: "",
      email: "",
      userName: "",
      password: "",
      position: "Frontend Developer",
      gitHubAccount: "",
    });
    window.open("/", "_self");
  };

  const handleDateChange = (event) => {
    setDateState({
      dateState: event.target.value,
    });
    handleChange(event);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    const isValid = agree;

    if (isValid) {
      document.getElementById("submitButton").removeAttribute("disabled");
    } else {
      document.getElementById("submitButton").setAttribute("disabled", true);
    }
  });

  const [variant, setVariant] = useState("success");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();

  return (
    <div>
      <NavBar />

      <Alert show={show} variant={variant}>
        <p style={{ textAlign: "center" }}>{message}</p>
      </Alert>

      <Container className="login">
        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <h3> Peronal Details </h3>
          </Col>
        </Row>
        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <Form>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={state.firstName}
                onChange={handleChange}
              />
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={state.lastName}
                onChange={handleChange}
              />
            </Form>
          </Col>
        </Row>

        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <Form.Label placeholder="months">Date Of Birth</Form.Label>
            <Form.Control
              type="date"
              id="start"
              name="dob"
              value={dateState.toLocaleDateString}
              onChange={handleDateChange}
              min="1975-01-01"
              max="2050-12-31"
            />
          </Col>
          <Col></Col>
        </Row>

        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <h3>Account Details</h3>
          </Col>
        </Row>

        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <Form>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Phone Number"
                name="phoneNumber"
                value={state.phoneNumber}
                onChange={handleChange}
              // a way to check this ?
              />
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="Email"
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
              />
            </Form>
          </Col>
        </Row>
        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <Form>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="userName"
                value={state.userName}
                onChange={handleChange}
              />
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
                value={state.password}
                onChange={handleChange}
              />
            </Form>
          </Col>
        </Row>
        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Select
                  name="position"
                  value={state.position}
                  onChange={handleChange}
                >
                  {Positions.map((position) => {
                    return <option value={position}>{position}</option>;
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Label>GitHub Account</Form.Label>
              <Form.Control
                type="select"
                placeholder="GitHub Account"
                name="gitHubAccount"
                value={state.gitHubAccount}
                onChange={handleChange}
              />
            </Form>
          </Col>
        </Row>
        <Row style={{ padding: "10px 0px 0px 0px" }}>
          <Col>
            <input
              type="checkbox"
              name="agree"
              id="agree"
              onClick={handleChecked}
            />
            <label style={{ padding: "10px 0px 0px 10px" }} htmlFor="agree">
              I agree to the{" "}
              <LinkContainer to='/Terms'>
                <a href="#" style={{ textAlign: "center" }}>
                  {" "}
                  Terms and Conditions
                </a>
              </LinkContainer>
            </label>
          </Col>
          <Col style={{ padding: "0px 0px 0px 10px" }}>
            <ButtonGroup
              style={{ float: "right", padding: "0px 30px 0px 0px" }}
            >
              <Button
                variant="primary"
                style={{ margin: "0px 8px 0px 0px" }}
                onClick={handleSubmit}
                id="submitButton"
              >
                Register
              </Button>
              <Button
                variant="dark"
                style={{ margin: "0px 8px 0px 0px" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
