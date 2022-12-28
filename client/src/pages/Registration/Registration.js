import { Container, Col, Row, Form, Button, ButtonGroup } from 'react-bootstrap'
// import { renderMatches } from 'react-router-dom';
import { NavBar } from '../../Components/nav/nav';
import { useState } from "react";


export default function RegistrationPage() {
    const base_url = 'http://localhost:9000/api'

    const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const Positions = ['Project Manager', 'Frontend Developer', 'Backend Developer'];

    const [dateState, setDateState] = useState({
        month: '12',
        date: '31',
        year: '2000',
    })

    const dateofbirth = dateState.year + '-' + dateState.month + '-' + dateState.date

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        dob: dateofbirth,
        phoneNumber: "",
        email: "",
        userName: "",
        password: "",
        position: "Project Manager",
        gitHubAccount: ""

    })

    const handleDateChange = (event) => {
        const { name, value } = event.target

        setDateState({
            ...dateState,
            [name]: value,
        })

    }

    const handleSubmit = async (e) => {
        // Prevent Default
        try {
            setState({
                ...state,
                dob: dateofbirth
            })

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
                base_url + `/signup`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                },
            )
            const data = await response.json()

            if (data.message === "User Created") {

                alert('Registration successful')
                window.location.href = '/login'  // User react router to go here
            } else {
                alert(data.message)
            }

        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    const handleCancel = () => {

    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setState({
            ...state,
            [name]: value,
        })
    }

    return (
        <div>
            <NavBar />

            <Container className='login'>

                <Row>
                    <Col><h3>Peronal Details</h3>
                        <hr />
                    </Col>
                </Row>
                <Row>

                    <Col>
                        <Form>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type='"text'
                                placeholder='First Name'
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
                                type='"text'
                                placeholder='Last Name'
                                name="lastName"
                                value={state.lastName}
                                onChange={handleChange}
                            />
                        </Form>
                    </Col>
                </Row>
                {/* restrict date range based on month some have 30 and others have 31 */}

                <Row>
                    <Col>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label placeholder='months' >Date Of Birth</Form.Label>
                                <Form.Select
                                    onChange={handleDateChange}
                                    name="month"
                                >
                                    {Months.map((month, index) => {
                                        return (
                                            <option
                                                key={month.value}
                                                value={index + 1}
                                            >
                                                {month}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>


                </Row>
                <Row>
                    <Col>
                        <Form.Control
                            type='text'
                            placeholder='Date'
                            name="date"
                            value={dateState.date}
                            onChange={handleDateChange}
                        ></Form.Control>
                    </Col>
                    <Col>
                        <Form.Control
                            type='text'
                            placeholder='Year'
                            name="year"
                            value={dateState.year}
                            onChange={handleDateChange}
                        ></Form.Control>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <h3>Account Details</h3>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                    </Col>
                    <Col>
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
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Username'
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
                                type='password'
                                placeholder='Password'
                                name="password"
                                autoComplete="off"
                                value={state.password}
                                onChange={handleChange}
                            />
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Position</Form.Label>
                                <Form.Select
                                    name="position"
                                    value={state.position}
                                    onChange={handleChange}
                                >
                                    {Positions.map((position) => {
                                        return (
                                            <option value={position}>{position}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
                <Row style={{ padding: "12px 0px 0px 0px" }}>
                    <Col style={{ padding: "0px 0px 0px 10px" }}>
                        <ButtonGroup style={{ float: "right", padding: "0px 30px 0px 0px" }}>
                            <Button
                                variant='dark'
                                style={{ margin: "0px 8px 0px 0px" }}
                                onClick={handleSubmit}
                            >
                                Register
                            </Button>
                            <Button
                                variant='dark'
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}