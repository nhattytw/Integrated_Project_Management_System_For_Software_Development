import { AssignmentContext, Context } from "../../../Context/context";
import { Container, Col, Row, Form, Button, Table, ButtonGroup } from 'react-bootstrap'
// import { CheckTreePicker, Toggle } from "rsuite";
import { Nav } from 'rsuite'
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import PauseRoundIcon from '@rsuite/icons/PauseRound';
import PeoplesIcon from '@rsuite/icons/Peoples';
import { useContext, useState, useEffect } from "react";
import ContenetDisplay from "../../../Components/ConentDisplay/ConentDisplay";
import { Alert } from 'react-bootstrap';



const base_url = 'http://localhost:9000/api'

const AssignemtsNav = () => {
    const { Assignment, setAssignment } = useContext(Context)

    return (
        <Container>
            <Row>
                <Col>
                    <Nav appearance='tabs' >
                        <Nav.Item icon={<PeoplesIcon />} onSelect={() => { setAssignment("AssignTaskToTeam") }}>Assign task to team</Nav.Item>
                        <Nav.Item icon={<CheckRoundIcon />} onSelect={() => { setAssignment("CompletedAssignments") }}>Completed Assignments</Nav.Item>
                        <Nav.Item icon={<PauseRoundIcon />} onSelect={() => { setAssignment("PendingAssignments") }}>Pending Assignments</Nav.Item>

                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}
const AssignTaskToTeam = () => {

    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const [state, setState] = useState({
        projectName: "",
        teamName: "",
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
            console.log(formBody)
            const response = await fetch(
                base_url + `/Teams/assignProject`,
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

            if (data.message === "Project Assigned To Team") {
                setMessage("Project Assigned To Team!")
                setVariant("success")
                setShow(true)
                this.handleLoad()
            } else {
                setMessage(data.message)
                setVariant("danger")
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


    useEffect(() => {
        const handleLoad = async () => {

            try {
                const teamResponse = await fetch(
                    base_url + `/Teams/getTeam`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': localStorage.getItem('Bearer')
                        },
                    },
                )
                const projectResponse = await fetch(
                    base_url + `/project/getProject`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': localStorage.getItem('Bearer')
                        },
                    },
                )

                const teamData = await teamResponse.json()
                const projectData = await projectResponse.json()

                if (teamData.message === "Team Information" && projectData.message === "Project Information") {
                    var teamResult = []

                    teamData.data.forEach(element => {
                        teamResult.push(element)
                    })

                    var teamList = document.getElementById("teamName")
                    teamList.options.length = 0

                    for (var i = 0; i < teamResult.length; i++) {
                        var teamOption = teamResult[i]
                        var teamElement = document.createElement("option")

                        teamElement.textContent = teamOption
                        teamElement.value = teamOption

                        teamList.appendChild(teamElement)
                    }

                    var projectResult = []

                    projectData.data.forEach(element => {
                        projectResult.push(element)
                    })

                    var projectList = document.getElementById("projectName")
                    projectList.options.length = 0

                    for (var j = 0; j < projectResult.length; j++) {
                        var projectOption = projectResult[j]
                        var projectElement = document.createElement("option")

                        projectElement.textContent = projectOption
                        projectElement.value = projectOption

                        projectList.appendChild(projectElement)
                    }

                    setState({
                        ...state,
                        teamName: teamResult[0],
                        projectName: projectResult[0]
                    })

                } else {
                    setMessage(teamData.message)
                    setVariant("danger")
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

        handleLoad()
    }, [])

    return (
        <div>
            <Alert show={show} variant={variant}>
                <p style={{ textAlign: 'center' }}>
                    {message}
                </p>
            </Alert>
            <Container>
                <Row>
                    <Col>
                        <h4>Assign Task</h4>
                        <Form>
                            <Form.Label>Project</Form.Label>
                            <Form.Select
                                name="projectName"
                                id="projectName"
                                value={state.projectName}
                                onChange={handleChange}
                            >
                                <option>Select</option>
                            </Form.Select>
                            <Form.Group>
                                <Form.Label>Teams </Form.Label>
                                <Form.Select
                                    name="teamName"
                                    id="teamName"
                                    value={state.teamName}
                                    onChange={handleChange}
                                >
                                    <option>Select</option>
                                </Form.Select>
                            </Form.Group>
                            <ButtonGroup
                                style={{
                                    float: "right",
                                    margin: "12px 0px 30px 0px"
                                }}>
                                <Button
                                    variant='primary'
                                    onClick={handleSubmit}
                                    id="submitButton"
                                >
                                    Assign
                                </Button>
                            </ButtonGroup>
                        </Form>
                    </Col>
                    <Col style={{ margin: "0px 0px 0px 18px" }}>

                        <h4>Assigned Task</h4>
                        <p>Active Projects</p>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Task</th>
                                    <th>Assigned Team</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {state.result.map((meeting, index) => (
                                    <tr data-index={index}>
                                        <td>{index + 1}</td>
                                        <td>{meeting.meetingId}</td>
                                        <td>{meeting.meetingTopic}</td>
                                        <td>{meeting.meetingDuration}</td>
                                        <td>
                                            {meeting.meetingStartTime.split('T')[1].split('Z')[0]}
                                        </td>
                                        <td>{meeting.meetingStartTime.split('T')[0]}</td>
                                        <td>
                                            <ButtonGroup style={{ float: "center", padding: "0px 30px 0px 0px" }}>
                                                <Button
                                                    variant='primary'
                                                    style={{ margin: "0px 8px 0px 0px" }}
                                                    id="submitButton"
                                                    onClick={() => {
                                                        window.open(meeting.meetingStartUrl, "_blank")
                                                    }}
                                                >
                                                    Start
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

const PendingAssignments = () => {
    return (
        <h4>Completed Assignments</h4>
    )
}

const CompletedAssignments = () => {
    return (

        <Container>
            <Row>
                <Col>
                    <h4>Completed task</h4>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task</th>
                                <th>Assigned Team</th>
                                <th>Date Assigned</th>
                                <th>Date Completed</th>
                                <th>Schedule</th>
                            </tr>
                        </thead>
                    </Table>
                </Col>
            </Row>
        </Container>


    )
}
const pages = {
    "PendingAssignments": PendingAssignments,
    "CompletedAssignments": CompletedAssignments,
    "AssignTaskToTeam": AssignTaskToTeam
}
const Assignments = () => {
    const { Assignment, setAssignment } = useContext(Context)

    return (
        <>
            <AssignemtsNav />
            <ContenetDisplay content={pages[Assignment]}>
            </ContenetDisplay>

        </>
    )
}

export default Assignments;