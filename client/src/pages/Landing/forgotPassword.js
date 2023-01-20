import { Container, Col, Row, Form, Button } from 'react-bootstrap'
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
        password: validatedPassword.newPassword,
        secret: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {

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
                window.location.href = '/login'  // Better Way to do this
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
            console.log(error) // Better Way to show this
            throw error
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
            handleSubmit()
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
                    <h4 >forgot password</h4>
                    <Form.Label>Enter your user name</Form.Label>
                    <Form.Control
                        type="text"
                        name='userName'
                        placeholder="Username"
                        value={state.userName}
                        onChange={handleChange}
                    />
                    <Form.Label>Enter secret</Form.Label>
                    <Form.Control
                        type="password"
                        name="secret"
                        placeholder="Secret"
                        value={state.secret}
                        onChange={handleChange}
                    />
                    <Form.Label>Enter password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={validatedPassword.newPassword}
                        onChange={handlePass}
                    />
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={validatedPassword.confirmPassword}
                        onChange={handlePass}
                    />

                    <Button
                        style={{ margin: "5px 0px 0px 0px" }}
                        type="submit"

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


                </Form>
            </Container>
        </>
    )
}
