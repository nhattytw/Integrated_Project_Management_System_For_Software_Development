import { Container, Col, Row, Button } from "react-bootstrap";
import { NavBar } from "../../Components/nav/nav";
import { Form } from "react-bootstrap"
import people from '../../Assets/BuissnessPeople.png'
import { useState } from "react";

export default function Login() {

    const base_url = 'http://localhost:9000/api'

    const handleSubmit = async (e) => {
        // Prevent Default
        try {
            var formBody = [];
            for (var property in state) {
                var encodedKey = encodeURIComponent(
                    property
                )
                var encodedValue = encodeURIComponent(
                    state[property]
                )
                formBody.push(encodedKey + "=" + encodedValue)
            }
            formBody = formBody.join("&")

            const response = await fetch(
                base_url + `/signin`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                },
            )
            const data = await response.json()

            if (data.message === "You've Logged in.") {
                localStorage.setItem(
                    'Bearer',
                    'Bearer ' + data.data
                )
                alert('Login successful')
                window.location.href = '/dashboard'  // User react router to go here
            } else {
                alert(data.message)
            }

        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    const [state, setState] = useState({
        userName: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setState({
            ...state,
            [name]: value,
        })
    }

    return (
        <>       <NavBar />

            <Form className="login">
                <Container >
                    <Row>
                        <Col>
                            <img src={people} alt="People" style={{ margin: "0px 0px 0px 75px" }} />
                            <h2 style={{ margin: "0px 0px 0px 95px" }}>Welcome Back</h2>
                            <hr ></hr>
                            <Form.Group className='d-grid gap-2'>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    name="userName"
                                    value={state.userName}
                                    onChange={handleChange}
                                />
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    autoComplete="off"
                                    value={state.password}
                                    onChange={handleChange}
                                />
                                <Button size="lg"
                                    variant="secondary"
                                    className="login-btn"
                                    onClick={handleSubmit}
                                >
                                    Login
                                </Button>
                                <a href="#" style={{ textAlign: "center" }}>Forgot Password ?</a>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Form>

        </>
    )
}