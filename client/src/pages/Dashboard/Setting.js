import { Container, Form, Button, ButtonGroup } from 'react-bootstrap'
import { useState } from 'react';
import { Alert } from 'react-bootstrap';


const SettingPage = () => {
    const base_url = 'http://localhost:9000/api'

    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const [state, setState] = useState({
        phoneNumber: "",
        email: "",
        userName: localStorage.getItem('userName'),
        gitHubAccount: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        var formBody = JSON.stringify(state)

        try {
            const response = await fetch(
                base_url + `/user/updateUserInfo`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': localStorage.getItem('Bearer')
                    },
                    body: formBody
                },
            )
            const data = await response.json()

            if (data.message === "Successfully Updated User Data.") {
                handleCancel()
                setMessage("UpdatedSuccessfully!!")
                setVariant("success")
                setShow(true)
            } else {
                handleCancel()
                setMessage(data.message)
                setVariant("danger")
                setShow(true)
            }

            setTimeout(() => {
                setShow(false)
            }, "3000")
        }
        catch (error) {
            handleCancel()
            setMessage(error.message)
            setVariant("danger")
            setShow(true)
        }
    }

    const handleCancel = () => {
        setState({
            ...state,
            phoneNumber: "",
            email: "",
            gitHubAccount: "",
            password: ""
        })
    }

    return (
        <div className='font-link'>
            <Alert show={show} variant={variant}>
                <p style={{ textAlign: 'center' }}>
                    {message}
                </p>
            </Alert>

            <Container>
                <h4> Edit Account Information </h4>
                <Form>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type='Number'
                        placeholder='Phone Number'
                        name="phoneNumber"
                        value={state.phoneNumber}
                        onChange={handleChange}
                    />
                </Form>
                <Form>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='Email'
                        placeholder='Email'
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                    />
                </Form>

                <Form>
                    <Form.Label>GitHub Account</Form.Label>
                    <Form.Control
                        type='select'
                        placeholder='GitHub Account'
                        name="gitHubAccount"
                        value={state.gitHubAccount}
                        onChange={handleChange}
                    />
                </Form>

                <Form>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </Form>
                <br />
                <ButtonGroup style={{ float: "right", padding: "0px 30px 0px 0px" }}>
                    <Button
                        variant='primary'
                        style={{ margin: "0px 8px 0px 0px" }}
                        onClick={handleSubmit}
                        id="submitButton"
                    >
                        Update
                    </Button>
                    <Button
                        variant='dark'
                        style={{ margin: "0px 8px 0px 0px" }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </Container>
        </div>
    )
}

export default SettingPage;