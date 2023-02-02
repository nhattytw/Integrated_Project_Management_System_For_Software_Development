import { Alert, Container, Col, Row, Form, Button, Table, ButtonGroup,ListGroup,ListGroupItem } from 'react-bootstrap'
import { Modal } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Nav } from 'rsuite'
import PeoplesMapIcon from '@rsuite/icons/PeoplesMap';
import BarChartIcon from '@rsuite/icons/BarChart';
import AdvancedAnalyticsIcon from '@rsuite/icons/AdvancedAnalytics';
import { PostTeams } from '../../API/Teams';
// import socketIOClient from "socket.io-client";
import { Context } from "../../Context/context";
import ContenetDisplay from '../../Components/ConentDisplay/ConentDisplay';
import '../../Styles/dashboard.css'
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
                        <Nav.Item icon={<AdvancedAnalyticsIcon />} onSelect={() => { setTeams("EditTeams") }}>
                            Edit Tems
                        </Nav.Item>

                        {/* <Nav.Item onSelect={() => { setCommunications("ScheduleMeetings") }}>Schedule Meeting</Nav.Item> */}

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
            <Container style={{backgroundColor:"red !important"}} >

                <Row>
                    <Col style={{margin:'1000px 10px 10px 10px'}}>
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
            teamName: TeamName.value
        }

        PostTeams(data)
        console.log(data)
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
        console.log(Team)
    };
    const onCreateTeam = () => {
        handleShow()
    }
    return (
        <Container  className="teamsContainer"style={{width:"50vh",margin:"100px 0px 0px 350px "}}>
            <h4>Unassigened Developers</h4>

            
            <Container >
            {developers.map((obj) => {
                return (
                    <div style={{width:"40vh",alignItems:"center"}}>
                        <ListGroup>
                            <ListGroupItem style={{margin:"3px 0px 0px 0px"}}>
                        <span>
                          
                            <span className='availableDevs'> {obj.userName}</span>
                            <span className='availableDevs'> {obj.position}</span>
                           
                        </span>
                            <input type="checkbox" className="checkbox"value={obj.userName} onChange={handleCheck}></input>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                )
            })}
            <Button style={{ float: "right",margin:"3px 30px 0px 0px" }} onClick={handleShow}>Add toTeam</Button>
            </Container>

            <CreateTeam />
        </Container>
    )
}

const EditTeams = () => {
    const [developers, setDevelopers] = useState([])
    const [members, setMembers] = useState([])
    const [show, setShow] = useState(false);
    const [Team, setTeam] = useState([])
    let temp = [];

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
            console.log(members)
        }

        return (
            <Container>
                <Row style={{ width: "50vh" }}>
                    <Col>
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
            teamName: TeamName.value
        }

        PostTeams(data)
        console.log(data)
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
        console.log(Team)
    };
    const onCreateTeam = () => {
        handleShow()
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Control type='text'></Form.Control>
                    </Form>
                </Col>
                <Col>
                    <Button>Search</Button>
                </Col>
            </Row>
            {developers.map((obj) => {
                return (
                    <div>
                        <input type="checkbox" value={obj.userName} onChange={handleCheck}></input>
                        <span>
                            {obj.userName}
                            <span> </span>
                            {obj.position}
                        </span>
                    </div>
                )
            })}

            {/* {developers.map((obj)=>{
                    return(
                        <ListTeams username={obj.userName} Position={obj.position}></ListTeams>
                    )
                })} */}


            <Button style={{ float: "right" }} onClick={handleShow}>Create Team</Button>

            <CreateTeam />
        </Container>
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

    const handleChange = (event) => {
        const { name, value } = event.target

        setState({
            ...state,
            [name]: value,
        })
    }

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
            
            const teamData = await teamResponse.json()
            console.log(teamData.data) 

            if (teamData.message === "Team Information") {
                var teamResult = []

                teamData.data.forEach(element => {
                    teamResult.push({
                            'teamName': element.isAssignedTo[0],
                            'projectName': element.projectName,
                            'wbs': element.wbs
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
            }, "3000")
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
                    <Col style={{ margin: "0px 0px 0px 18px" }}>

                        <h4>Created Teams</h4>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Team name</th>
                                    <th>Assigned Team</th>
                                </tr>
                            </thead>
                            <tbody >
                                {state.result?.map((projects, index) => (
                                    <tr data-index={index}>
                                        <td>{index + 1}</td>
                                        <td>{projects.projectName}</td>
                                        <td>{projects.teamName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

const pages = {
    "CreateTeams": CreateTeams,
    "ViewTeams": ViewTeams,
    "EditTeams": EditTeams
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