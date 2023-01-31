import { Container, Col, Row, Button } from "react-bootstrap";
import { NavBar } from "../../Components/nav/nav";
import { Form } from "react-bootstrap"
import people from '../../Assets/BuissnessPeople.png'
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Alert } from 'react-bootstrap';

export default function Login() {

    const base_url = 'http://localhost:9000/api'

    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()


    const [state, setState] = useState({
        userName: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        // Prevent Default
        e.preventDefault()

        try {
            var formBody = JSON.stringify(state)

            const response = await fetch(
                base_url + `/signin`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: formBody
                },
            )
            const data = await response.json()

            if (data.message === "You've Logged in.") {
                if (data.data.position === "Project Manager") {
                    localStorage.setItem(
                        'Bearer',
                        'Bearer ' + data.data.token
                    )
                    localStorage.setItem(
                        'userName',
                        data.data.userName
                    )
                    localStorage.setItem(
                        'position',
                        data.data.position
                    )
                    setMessage("Login successful!")
                    setVariant("success")
                    setShow(true)

                    // Use react router here and based on user go to respective dashboards
                    // [Violation] Forced reflow while executing JavaScript took 31ms
                    window.open('/dashboard', '_self')
                }
                else {
                    setMessage("Please Use The Developer Web App")
                    setVariant("danger")
                    setShow(true)
                }
            } else {
                setMessage(data.message)
                setVariant("danger")
                setShow(true)
            }
            setState ({
                userName: "",
                password: ""
            })
            setTimeout(() => {
                setShow(false)
            }, "3000")
        }
        catch (error) {
            console.log(error)
            setMessage(error.message)
            setVariant("danger")
            setShow(true)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setState({
            ...state,
            [name]: value,
        })
    }

    return (
        <>
            <NavBar />

            <Alert show={show} variant={variant}>
                <p style={{ textAlign: 'center' }}>
                    {message}
                </p>
            </Alert>

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
                                <LinkContainer to='/forgetpassword'>
                                    <a href="#" style={{ textAlign: "center" }}>Forgot Password ?</a>

                                </LinkContainer>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Form>

        </>
    )
}