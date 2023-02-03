import { Alert, Container, Col, Row, Form, Button, ButtonGroup, ListGroup, ListGroupItem, Table, Accordion } from 'react-bootstrap'
import { Modal } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Nav } from 'rsuite'
import PeoplesMapIcon from '@rsuite/icons/PeoplesMap';
import BarChartIcon from '@rsuite/icons/BarChart';
import AdvancedAnalyticsIcon from '@rsuite/icons/AdvancedAnalytics';
import { PostTeams } from '../../API/Teams';
import { Context } from "../../Context/context";
import ContenetDisplay from '../../Components/ConentDisplay/ConentDisplay';
import '../../Styles/dashboard.css'
// import socketIOClient from "socket.io-client";


const endPoint = "http://127.0.0.1:3001"
const base_url = 'http://localhost:9000/api'


const TeamsNav = () => {
    const { Team, setTeams } = useContext(Context)

    return (
        <Container>
            <Row>
                <Col>
                    <Nav appearance='tabs' >
                        <Nav.Item icon={<BarChartIcon />} onSelect={() => { setTeams("ViewTeams") }}>
                            View Teams
                        </Nav.Item>
                        <Nav.Item icon={<PeoplesMapIcon />} onSelect={() => { setTeams("CreateTeams") }}>
                            Create Teams
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

const CreateTeams = () => {
    const [developers, setDevelopers] = useState([])
    const [members, setMembers] = useState([])
    const [show, setShow] = useState(false);
    const [Team, setTeam] = useState([])
    let temp = [];

    const [variant, setVariant] = useState('success')
    const [message, setMessage] = useState()
    // const socket = socketIOClient(endPoint)

    const url = 'http://localhost:9000/api/Teams/getDeveloper'
    useEffect(() => {
        axios.get(
            url,
            {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('Bearer')
                },
            }
        ).then((response) => {
            setDevelopers(response.data)

        })


    }, [])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNameInput = (event) => {

    }
    const ListTeams = (props) => {
        const [select, setSelect] = useState(false)
        let result = []

        const addMemeber = (e) => {
            setMembers([...members, e.target.value])

        }

        return (
            <Container style={{ backgroundColor: "red !important" }} >

                <Row>
                    <Col style={{ margin: '1000px 10px 10px 10px' }}>
                        <p>{props.username}</p>
                    </Col>
                    <Col>
                        <p>{props.Position}</p>
                    </Col>
                    <Col>
                        <input type='checkbox' value={props.username} onChange={(e) => {
                            addMemeber(e)

                        }}></input>
                    </Col>
                </Row>

            </Container>
        )
    }
    const handleSubmit = () => {
        const TeamName = document.getElementById('teamName')

        const data = {
            members: Team,
            teamName: TeamName.value,
            userName: localStorage.getItem('userName')
        }

        PostTeams(data)
        // socket.emit("TeamCreation")

        handleClose()
    }
    const CreateTeam = (props) => {
        return (

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Team Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control type='text' placeholder='Enter team name' id='teamName' autoComplete='false'></Form.Control>
                        <Button style={{ margin: '4px 0px 0px 0px' }} onClick={() => { handleSubmit() }}>Save</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        )
    }

    const handleCheck = (event) => {
        var updatedList = [...Team];
        if (event.target.checked) {
            updatedList = [...Team, event.target.value];
        } else {
            updatedList.splice(Team.indexOf(event.target.value), 1);
        }
        setTeam(updatedList);
    };
    const onCreateTeam = () => {
        handleShow()
    }
    return (
        <div>
            <Alert show={show} variant={variant}>
                <p style={{ textAlign: 'center' }}>
                    {message}
                </p>
            </Alert>
            <Container className="teamsContainer" style={{ width: "50vh", margin: "100px 0px 0px 350px " }}>
                <h4 style={{ margin: "0px 10px 6px 0px" }}>Unassigned Developers</h4>

                <Container >
                    {developers?.map((obj) => (
                        <div style={{ width: "40vh", alignItems: "center" }}>
                            <ListGroup>
                                <ListGroupItem style={{ margin: "3px 0px 0px 0px" }}>
                                    <span>

                                        <span className='availableDevs'> {obj.userName}</span>
                                        <span className='availableDevs'> {obj.position}</span>

                                    </span>
                                    <input type="checkbox" className="checkbox" value={obj.userName} onChange={handleCheck}></input>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    ))}
                    <Button style={{ float: "right", margin: "3px 30px 0px 0px" }} onClick={handleShow}>Add to Team</Button>
                </Container>

                <CreateTeam />
            </Container>
        </div>
    )
}

const ViewTeams = () => {
    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const [state, setState] = useState({
        teamName: "",
        result: [],
        userName: localStorage.getItem('userName')
    })

    const handleDelete = async (teamName) => {
        state.teamName = teamName

        var formBody = JSON.stringify(state)

        console.log(formBody)

        const teamResponse = await fetch(
            base_url + `/Teams/deleteTeam`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('Bearer')
                },
                body: formBody
            },
        )
        const data = await teamResponse.json()

        if (data.message === "Team Information") {
            setMessage("Deleted Team Successfully!")
            setVariant("success")
            setShow(true)
            handleLoad()
        } else {
            setMessage(data.message)
            setVariant("danger")
            setShow(true)
        }

        setTimeout(() => {
            setShow(false)
        }, "3000")
    }

    const handleLoad = async () => {
        var formBody = JSON.stringify(state)

        try {
            const teamResponse = await fetch(
                base_url + `/Teams/getAllTeam`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': localStorage.getItem('Bearer')
                    },
                    body: formBody
                },
            )

            const teamData = await teamResponse.json()

            if (teamData.message === "Team Information") {
                var teamResult = []

                teamData.data.forEach(element => {
                    teamResult.push({
                        'teamName': element.teamName,
                        'members': element.members
                    })
                })

                state.result = teamResult


                setState({
                    ...state,
                    teamName: "",
                })
            } else {
                console.log(teamData.message)
                setMessage(teamData.message)
                setVariant("danger")
                setShow(true)
            }

            setTimeout(() => {
                setShow(false)
            }, "5000")
        } catch (error) {
            if (error.message === `Unexpected token 'A', "Access Denied" is not valid JSON`) {
                let msgg = `Access Denied`
                setMessage(msgg)
                setVariant("danger")
                setShow(true)
            }
            else {
                setMessage(error.message)
                setVariant("danger")
                setShow(true)
            }
        }
    }

    useEffect(() => {
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
                        <h4 style={{ margin: "0px 10px 6px 0px" }}>Teams</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {state.result?.map((teams) => (
                            <Accordion>
                                <Accordion.Header>
                                    {teams.teamName}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <h6>Members</h6>
                                    {teams.members?.map((members) => (
                                        <Row>
                                            <Col>
                                                {members}
                                            </Col>
                                        </Row>
                                    ))}
                                    <ButtonGroup
                                        style={{
                                            float: "right",
                                            margin: "12px 0px 30px 0px"
                                        }}>

                                        <Button
                                            variant='danger'
                                            onClick={() => { handleDelete(teams.teamName) }}
                                            id="submitButton"
                                        >
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </Accordion.Body>
                            </Accordion>
                        ))}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div >
    )
}

const pages = {
    "CreateTeams": CreateTeams,
    "ViewTeams": ViewTeams
}

const Teams = () => {
    const { Team, setTeams } = useContext(Context)

    return (
        <>
            <TeamsNav />
            <ContenetDisplay content={pages[Team]}>
            </ContenetDisplay>
        </>
    )
}

export default Teams;