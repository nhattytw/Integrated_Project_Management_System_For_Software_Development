import { Container, Col, Row } from "react-bootstrap";
import { NavBar } from "../../Components/nav/nav";
import { useState } from "react";
import team from "./team.jpg";

export default function About() {
  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <img src={team} alt="team" style={{ margin: "0px 0px 0px 75px" }} />
            <h2 style={{ margin: "0px 0px 0px 95px" }}>Our Story</h2>
          </Col>
        </Row>
        <Row>
          <p>
            We are a group of fresh computer science graduates from HiLCoE
            school of Computer Science and Technology making our way through the
            tech industry by creating project managment solutions.
          </p>
        </Row>
      </Container>
    </>
  )
}
