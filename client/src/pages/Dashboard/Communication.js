import { Container, Col, Row, Form, Button, Table, Tab, Dropdown, ButtonGroup } from 'react-bootstrap'
import Overlay from 'react-bootstrap';
import { Nav } from 'rsuite'
import NoticeIcon from '@rsuite/icons/Notice';
import TimeIcon from '@rsuite/icons/Time';
import EmailIcon from '@rsuite/icons/Email';
import { Context } from '../../Context/context';
import { useContext, useState } from 'react';
import ContenetDisplay from '../../Components/ConentDisplay/ConentDisplay';

const CommunicationsNav = () => {
    const { communications, setCommunications } = useContext(Context)
    return (
        <Container>
            <Row>
                <Col>
                    <Nav appearance='tabs' >
                        <Nav.Item icon={<NoticeIcon />} onSelect={() => { setCommunications("ScheduledMeetings") }} >Scheduled Meetings</Nav.Item>
                        <Nav.Item icon={<TimeIcon />} onSelect={() => { setCommunications("ScheduleMeetings") }}>Schedule Meeting</Nav.Item>
                        <Nav.Item icon={<EmailIcon />} onSelect={() => { setCommunications("Email") }}>Email</Nav.Item>
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

const ScheduleMeetings = () => {
    const [dateState, setDateState] = useState({
        month: '12',
        date: '31',
        year: '2000',
    })

    const dateofbirth = dateState.year + '-' + dateState.month + '-' + dateState.date

    const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [state, setState] = useState({
        topic: "",
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

    const handleSubmit = () => {

    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Schedule Meetings</h3>
                    <p>Meetings will be scheduled on Zoom</p>
                </Col>
            </Row>
            <Row style={{ margin: "12px 0px 0px 0px" }}>
                <Col >
                    <Form >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Title of Meeting'
                            name="firstName"
                            value={state.topic}
                            onChange={state.topic}
                        ></Form.Control>
                    </Form>
                </Col>

            </Row>
            <Row style={{ margin: "12px 0px 0px 0px", padding: "0px 10px 0px 0px" }}>
                <h3 style={{ padding: "0px 5px 10px 0px" }}>Schedule</h3>
                {/* <ButtonGroup>
                    <Dropdown>
                        <Dropdown.Toggle>Start date</Dropdown.Toggle>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle>start time</Dropdown.Toggle>
                    </Dropdown>
                    <p style={{ fontSize: "20px", padding: "0px 0px 0px 5px" }}>to</p>
                    <Dropdown>
                        <Dropdown.Toggle>end time</Dropdown.Toggle>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle>end date</Dropdown.Toggle>
                    </Dropdown>
                </ButtonGroup>
                <Col style={{ margin: "10px 0px 2px 0px" }}>
                    <Dropdown.Toggle>Frequency</Dropdown.Toggle>
                </Col> */}
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
            </Row>
            <Row>
                <Col>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} cols={13}></Form.Control>
                </Col>
                <Col style={{ margin: "50px 0px 2px 0px" }}>
                    <Button variant='dark'>Schedule Meeting</Button>
                    <Button variant='dark'>cancel</Button>
                </Col>
            </Row>

        </Container>
    )
}

const ScheduledMeetings = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h4>Scheduled Meetings</h4>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Participant/s</th>
                                <th>Start time</th>
                                <th>Completion time</th>
                                <th>date</th>
                            </tr>
                        </thead>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

const Email = () => {
    return (
        <Container>
            <Row>
                <Col><h3>Automated Email</h3></Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text"></Form.Control>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Subject</Form.Label>
                    <Form.Control as="textarea"></Form.Control>
                </Col>
            </Row>
            <Row>
                <Col><Button>send   </Button></Col>
            </Row>
        </Container>
    )
}

const Communications = () => {
    const { Communications, setCommunication } = useContext(Context)
    const pages = {
        "ScheduleMeetings": ScheduleMeetings,
        "ScheduledMeetings": ScheduledMeetings,
        "Email": Email
    }

    return <Container>
        <CommunicationsNav />
        <ContenetDisplay content={pages[Communications]}>

        </ContenetDisplay>
    </Container>
}
export default Communications;