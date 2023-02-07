import "../../Styles/dashboard.css"
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Accordion, Alert, Table, ButtonGroup } from "react-bootstrap";
import NavItem from "rsuite/esm/Nav/NavItem";
import { Nav } from "rsuite";
import { Context } from "../../Context/context";
// import Clock from 'react-live-clock';
import React from "react";
import { postComment } from "../../API/Issues";
import ContenetDisplay from "../../Components/ConentDisplay/ConentDisplay";


const base_url = 'http://localhost:9000/api'

const Header = () => {
    let x = new Date()
    return (
        <Container className="font-link">
            <Row>
                <Col xs lg="0" >
                    <h3>Welcome  {localStorage.getItem("userName")}</h3>
                </Col>
                <Col xs lg="2">
                    {/* <Clock style={{float:"right",fontSize:"20px"}} className="adminClock" format={'HH:mm:ss'}  ticking={true} timezone={'Africa/Addis_Ababa'} /> */}
                </Col>
            </Row>
            <div style={{ float: "right", fontSize: "40px" }}>
                {/* <h1 style={{float:"right",fontSize:"40px"}}>{x.getMonth()}/{x.getDate()}/{x.getFullYear()}</h1> */}
            </div>

        </Container>
    )
}
const ProjectNav = () => {

    const { adminPages, setAdminPages } = useContext(Context)
    return (
        <div style={{ margin: "0px 200px 0px 180px" }}>

            <Nav appearance="tabs" style={{ padding: "0px 0px 0px 0px" }}>
                <Nav.Item eventKey="home" onSelect={() => { setAdminPages("projects") }}>
                    Your Projects
                </Nav.Item>
                <Nav.Item eventKey="news" onSelect={() => { setAdminPages("Issues") }}>Issues</Nav.Item>
                <Nav.Item eventKey="solutions" onSelect={() => { setAdminPages("Teams") }}>Teams</Nav.Item>
                {/* <Nav.Item eventKey="products" onSelect={() => { setAdminPages("ScheduledMeetings") }}>Meetings</Nav.Item> */}

            </Nav>

        </div>
    )
}
//add padding to the cards
const AllProjects = () => {
    const [allProjects, setallProjects] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        const url = 'http://localhost:9000/api/project/ActiveProject'

        let payload = { userName: localStorage.getItem('userName') }

        axios.post(
            url,
            payload
        ).then((response) => {
            setallProjects(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    console.log(allProjects)
    return (
        <Container>
            <Row className="projectDisplayHeader">
                <Col># |</Col>
                <Col>Project Name</Col>
                <Col>Duration</Col>
                <Col>Repository</Col>
                <Col>Status</Col>
                <Col>Created At</Col>
            </Row>
            {allProjects.map((project, index) => {

                return (
                    <Row className="projectDisplay">
                        <Col>{index += 1}</Col>
                        <Col>{project.projectName}</Col>
                        <Col>{project.duration}</Col>
                        <Col>{project.projectRepository}</Col>
                        <Col><li style={{ color: 'green' }}>{project.status}</li></Col>
                        <Col>{project.createdAt}</Col>
                    </Row>

                )
            })}
        </Container>
    )
}

const Issues = () => {
    const options = "Resolved"
    const [allIssues, setActiveIssues] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:9000/api/Issues/getActiveIssues")
            .then((response) => {
                setActiveIssues(response.data);
            });
    }, []);
    const CommentBox = (props) => {
        const [comment, setComment] = useState([])
        const [message, setMessage] = useState({
            Comment: "",
        });
        useEffect(() => {
            setComment(props.comments)

        }, [])
        const handleOnchangeEvent = (e) => {
            const temp = Object.assign(message, { [e.target.name]: e.target.value });
            setMessage(temp);
        };
        const handleComment = () => {
            const temp = [...comment, message.Comment]
            postComment({ id: props.id, comment: temp })
            setComment(temp)

        }
        if (props.display) {
            return (
                <Container style={{ padding: "10px" }}>
                    {comment.map((comment) => {
                        return (
                            <p>{comment}</p>
                        )

                    })}
                    <Row>
                        <Form.Control type="text" placeholder="Comment"
                            name="Comment"
                            onChange={handleOnchangeEvent}
                        />
                    </Row>
                    <Row style={{ margin: "10px 0px 0px 0px" }}>
                        <Col sm={4}>
                            <Button onClick={() => { handleComment() }}>
                                Post
                            </Button>
                        </Col>
                    </Row>
                </Container>
            );
        }
    };
    const Comment = (props) => {
        const [show, setShow] = useState(false);

        return (
            <Card style={{ margin: "10px 0px 0px 0px", padding: "10px" }}>
                <Card.Title>
                    <Row>
                        <h3>{props.title}</h3>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <p>PostedBy: {props.postedBy}</p>
                        </Col>
                        <Col sm={4}>
                            <p>Date: {props.createdAt.split('T')[0]}</p>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Body>
                    <Row>
                        <p>{props.issue}</p>
                    </Row>
                    <Row>
                        <Col>
                            <button
                                style={{ float: "right" }}
                                onClick={() => {
                                    setShow(!show);
                                }}
                            >
                                comment
                            </button>
                        </Col>
                        <CommentBox display={show} comments={props.comments} id={props.id}></CommentBox>
                    </Row>
                </Card.Body>
            </Card>
        );
    };

    return (
        <React.Fragment>
            {allIssues.map((issue) => {
                console.log(issue)
                return (
                    <Comment
                        title={issue.title}
                        postedBy={issue.postedBy}
                        createdAt={issue.createdAt}
                        issue={issue.body}
                        comments={issue.comment}
                        id={issue._id}
                    ></Comment>
                );
            })}
        </React.Fragment>
    );
};

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
        <div className='font-link'>
            <Row>
                <Col>
                    <h4 style={{ margin: "0px 10px 6px 0px" }}>Teams</h4>
                </Col>
            </Row>

            <Container>
                <Row >
                    <Col># |</Col>
                    <Col>Team Name</Col>
                </Row>
                <Row>
                    {state.result?.map((teams, index) => (
                        <Row className="projectDisplay">
                            <Col>{index + 1}</Col>
                            <Col>{teams.teamName}</Col>
                        </Row>
                    ))}


                </Row>
            </Container>
        </div >
    )
}
const ScheduledMeetings = () => {
    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const [state, setState] = useState({
        userName: localStorage.getItem('userName'),
        result: [],
        temp: ""
    })

    const handleLoad = async () => {
        setState({
            ...state,
            userName: localStorage.getItem('userName'),
        })

        try {
            var formBody = JSON.stringify(state)

            const response = await fetch(
                base_url + `/listMeetings`,
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
            const data = await response.json()

            if (data.message === "List of Meetings") {
                // setState({
                //     ...state,
                //     result: data.data
                // })

                data.data.forEach((element) => {
                    element.meetingInfo.forEach((item) => {
                        state.result.push(item)
                    })
                })

                setState({
                    ...state,
                    temp: ""
                })
            } else {
                setMessage(data.message)
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
                    <Col>
                        <h4>Scheduled Meetings</h4>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project Name</th>
                                    <th>Meeting Id</th>
                                    <th>Topic</th>
                                    <th>Duration</th>
                                    <th>Start Time</th>
                                    <th>Start Date</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.result?.map((meeting, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{meeting.projectName}</td>
                                        <td>{meeting.meetingId}</td>
                                        <td>{meeting.meetingTopic}</td>
                                        <td>{meeting.meetingDuration}</td>
                                        <td>
                                            {meeting.meetingStartTime.split('T')[1].split('+')[0]}
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
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}


const AdminPanel = () => {
    const { adminPages, setAdminPages } = useContext(Context)
    const pages = {
        "projects": AllProjects,
        "Issues": Issues,
        "Teams": ViewTeams,

    }
    return (
        <>
            <Header />
            <ProjectNav />
            <ContenetDisplay content={pages[adminPages]}>

            </ContenetDisplay>


        </>
    )
}
export default AdminPanel;