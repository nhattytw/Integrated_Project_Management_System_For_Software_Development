import { Container, Col, Row, Form, Button, Table, ButtonGroup,Card } from 'react-bootstrap'
// import Overlay from 'react-bootstrap';
import { Nav } from 'rsuite'
import NoticeIcon from '@rsuite/icons/Notice';
import TimeIcon from '@rsuite/icons/Time';
// import EmailIcon from '@rsuite/icons/Email';
import { Context } from '../../Context/context';
import { useContext, useState, useEffect } from 'react';
import ContenetDisplay from '../../Components/ConentDisplay/ConentDisplay';
import { Alert } from 'react-bootstrap';
import { DatePicker } from 'rsuite';
import moment from 'moment'
import React from 'react';
import axios from 'axios';
import { postComment } from '../../API/Issues';



const base_url = 'http://localhost:9000/api'

const CommunicationsNav = () => {
    const { communications, setCommunications } = useContext(Context)
    return (
        <Container>
            <Row>
                <Col>
                    <Nav appearance='tabs' >
                        <Nav.Item onSelect={() => { setCommunications("Issues") }}>Issues</Nav.Item>
                        <Nav.Item icon={<NoticeIcon />} onSelect={() => { setCommunications("ScheduledMeetings") }} >Scheduled Meetings</Nav.Item>
                        <Nav.Item icon={<TimeIcon />} onSelect={() => { setCommunications("ScheduleMeetings") }}>Schedule Meeting</Nav.Item>
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

const ScheduleMeetings = () => {
    const [dateState, setDateState] = useState(new Date())

    const [state, setState] = useState({
        topic: "",
        duration: 10,
        start_time: "",
        userName: localStorage.getItem('userName')
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setState({
            ...state,
            [name]: value,
        })
    }

    const handleDateChange = (event) => {
        setDateState(event.target.value)
        handleChange(event)
    }

    const [num, setNum] = useState(10);

    const handleDuration = (event) => {
        setNum(event.target.value)

        handleChange(event)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            var formBody = JSON.stringify(state)

            const response = await fetch(
                base_url + `/createMeeting`,
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

            if (data.message === "Meeting Created") {
                handleCancel()
                setMessage("Meeting Created successfully!")
                setVariant("success")
                setShow(true)

            } else {
                setMessage(data.message)
                setVariant("danger")
                setShow(true)
                handleCancel()
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

    const handleInstant = async (event) => {
        try {
            const response = await fetch(
                base_url + `/instantMeeting`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': localStorage.getItem('Bearer')
                    }
                },
            )
            const data = await response.json()

            if (data.message === "Meeting Created") {
                setMessage("Meeting Created successfully!")
                setVariant("success")
                setShow(true)
                window.open(data.data.join_url, "_blank")
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

    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const handleCancel = () => {
        setState({
            ...state,
            topic: "",
            duration: 10,
            start_time: moment(new Date()).format(),
            userName: localStorage.getItem('userName')
        })
    }

    return (
        <div>
            <Alert show={show} variant={variant}>
                <p style={{ textAlign: 'center' }}>
                    {message}
                </p>
            </Alert>

            <Container style={{ float: "center", margin: "0px 30px 0px 50px" }}>
                <Row style={{ padding: "10px 0px 0px 0px" }}>
                    <Col>
                        <h3>Instant Meeting</h3>
                        <p>All meeting will be scheduled on Zoom.</p>
                    </Col>
                    <Col>
                        <h3>Schedule Meeting</h3>
                        <p>All meeting will be scheduled on Zoom.</p>
                    </Col>
                </Row>
                <Row style={{ padding: "10px 0px 0px 0px" }}>
                    <Col>
                        <ButtonGroup style={{ float: "left", padding: "0px 30px 0px 0px" }}>
                            <Button
                                variant='primary'
                                style={{ margin: "0px 8px 0px 0px" }}
                                onClick={handleInstant}
                                id="submitButton"
                            >
                                Instant Meeting
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Title of Meeting'
                                name="topic"
                                value={state.topic}
                                onChange={handleChange}
                            ></Form.Control>
                        </Form>
                    </Col>
                </Row>
                <Row style={{ padding: "10px 0px 0px 0px" }}>
                    <Col></Col>
                    <Col>
                        <Form>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="number"
                                name="duration"
                                min={10}
                                max={40}
                                step={5}
                                value={num}
                                onChange={handleDuration}
                                scrollable='true'
                            />
                        </Form>
                    </Col>
                </Row>
                <Row style={{ padding: "10px 0px 0px 0px" }}>
                    <Col></Col>
                    <Col>
                        <Form.Label>Meeting Time</Form.Label>
                        <br></br>
                        <DatePicker
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            // calendarDefaultDate={new Date()}
                            ranges={[
                                {
                                    label: 'Now',
                                    value: new Date()
                                }
                            ]}
                            selected={dateState}
                            onChange={
                                dateTime => handleDateChange({
                                    target: {
                                        value: moment(dateTime).format(),
                                        name: 'start_time'
                                    }
                                })}
                        />
                        <br></br>
                    </Col>
                </Row>
                <Row style={{ padding: "10px 0px 0px 0px" }}>
                    <Col></Col>
                    <Col style={{ padding: "0px 0px 0px 10px" }}>
                        <ButtonGroup style={{ float: "right", padding: "0px 30px 0px 0px" }}>
                            <Button
                                variant='primary'
                                style={{ margin: "0px 8px 0px 0px" }}
                                onClick={handleSubmit}
                                id="submitButton"
                            >
                                Schedule Meeting
                            </Button>
                            <Button
                                variant='dark'
                                style={{ margin: "0px 8px 0px 0px" }}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container >
        </div>
    )
}

const ScheduledMeetings = () => {
    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const [state, setState] = useState({
        userName: localStorage.getItem('userName'),
        result: []
    })

    useEffect(() => {
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
                    setState({
                        ...state,
                        result: data.data
                    })
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
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

// Maybe make this for instant meeting for better look


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
          const [comment,setComment] = useState([])
          const [message, setMessage] = useState({
            Comment: "",
          });
          useEffect(()=>{
            setComment(props.comments)
      
          },[])
          const handleOnchangeEvent = (e) => {
            const temp = Object.assign(message, { [e.target.name]: e.target.value });
            setMessage(temp);
          };
          const handleComment = ()=>{
            const temp = [...comment,message.Comment]
            postComment({id:props.id,comment:temp})
            setComment(temp)
           
          }
          if (props.display) {
            return (
              <Container style={{ padding: "10px" }}>
                {comment.map((comment)=>{
                  return(
                      <p>{comment}</p>
                  )
                  
                })}
                <Row>
                  <Form.Control type="text" placeholder="Comment" 
                  name="Comment" 
                  onChange={handleOnchangeEvent}
                  />
                </Row>
                <Row style={{margin: "10px 0px 0px 0px" }}>
                  <Col sm={4}>
                    <Button onClick={()=>{handleComment()}}>
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
                    <p>PostedBy:{props.postedBy}</p>
                  </Col>
                  <Col sm={4}>
                    <p>Date:{props.createdAt}</p>
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




const Communications = () => {
    const { Communications, setCommunication } = useContext(Context)
    const pages = {
        "ScheduleMeetings": ScheduleMeetings,
        "ScheduledMeetings": ScheduledMeetings,
        "Issues": Issues
    }

    return <Container>
        <CommunicationsNav />
        <ContenetDisplay content={pages[Communications]}>

        </ContenetDisplay>
    </Container>
}

export default Communications;