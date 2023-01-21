import { Container, Col, Row, Form, Button, ButtonGroup } from 'react-bootstrap'
import { NavBar } from '../../Components/nav/nav';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';


export default function ForgotPassword() {
    const base_url = 'http://localhost:9000/api'

    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const [validatedPassword, setValidatedPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    })

    const [state, setState] = useState({
        userName: "",
        password: validatedPassword.confirmPassword,
        secret: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setState({
            ...state,
            [name]: value,
        })
    }
    const handleSecret = async () => {

        var formBody = JSON.stringify(state)

        try {
            const response = await fetch(
                base_url + `/sendKey`,
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

            if (data.is_error === true) {
                setMessage(data.message)
                setVariant("danger")
                setShow(true)
            } else {
                setMessage(data.message)
                setVariant("success")
                setShow(true)
            }

            setTimeout(() => {
                setShow(false)
            }, "3000")
        }
        catch (error) {
            setMessage(error.message)
            setVariant("danger")
            setShow(true)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        var formBody = JSON.stringify(state)

        try {
            const response = await fetch(
                base_url + `/forgotPassword`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: formBody
                },
            )
            const data = await response.json()

            if (data.is_error === true) {
                setMessage(data.message)
                setVariant("danger")
                setShow(true)
            } else {
                setMessage("Password reset successful!")
                setVariant("success")
                setShow(true)
                window.open('/login', '_self')
            }

            setTimeout(() => {
                setShow(false)
            }, "3000")
            handleCancel()
        }
        catch (error) {
            setMessage(error.message)
            setVariant("danger")
            setShow(true)
        }
    }

    const handleCancel = () => {
        setValidatedPassword({
            ...validatedPassword,
            newPassword: "",
            confirmPassword: ""
        })
        setState({
            ...state,
            userName: "",
            password: "",
            secret: ""
        })
    }

    const handlePass = (event) => {
        setValidatedPassword({
            validatedPassword: event.target.value
        })
        handleChange(event)
    }

    const handleCheckPassword = (event) => {
        event.preventDefault();

        const newpass = event.target.elements.password.value.trim();
        const conpass = event.target.elements.confirmPassword.value.trim();

        if (conpass === newpass) {
            setVariant("success")
            setShow(true)
        }
        else {
            setMessage("Password doesn't match, password change failed!")
            setVariant("danger")
            setShow(true)
        }

        setTimeout(() => {
            setShow(false)
        }, "3000")
        handleCancel()
    }

    return (
        <>
            <NavBar />

            <Alert show={show} variant={variant}>
                <p style={{ textAlign: 'center' }}>
                    {message}
                </p>
            </Alert>

            <Container >
                <Form onSubmit={handleCheckPassword} className='forgotPass' style={{ padding: '100px' }}>
                    <h4>Forgot Password</h4>
                    <br />
                    <Row>
                        <Col>
                            <Form.Label>Enter Username</Form.Label>
                            <Form.Control
                                type="text"
                                name='userName'
                                placeholder="Username"
                                value={state.userName}
                                onChange={handleChange}
                                tabindex="1"
                            />
                        </Col>
                        <Col>
                            <Form.Label>Enter New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="New Password"
                                value={validatedPassword.newPassword}
                                onChange={handlePass}
                                tabindex="3"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label>Enter Secret (Check your email)</Form.Label>
                            <Form.Control
                                type="password"
                                name="secret"
                                placeholder="The Secret that is sent in your email."
                                value={state.secret}
                                onChange={handleChange}
                                tabindex="2"
                            />
                        </Col>
                        <Col>
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                value={validatedPassword.confirmPassword}
                                onChange={handlePass}
                                tabindex="4"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button
                                variant='primary'
                                onClick={handleSecret}
                                style={{ margin: "5px 0px 0px 0px" }}
                            >
                                Get Key
                            </Button>
                        </Col>
                        <Col>
                            <ButtonGroup style={{ float: "right", padding: "0px 30px 0px 0px" }}>

                                <Button
                                    style={{ margin: "5px 0px 0px 0px" }}
                                    type="submit"
                                    onClick={handleSubmit}
                                    tabindex="5"
                                >
                                    Confirm
                                </Button>

                                <Button
                                    variant='dark'
                                    style={{ margin: "5px 0px 0px 10px" }}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>

                </Form>
            </Container>
        </>
    )
}
