import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Table,
  Tab,
  Dropdown,
  ButtonGroup,
  Card,
} from "react-bootstrap";
import { Icon } from "@rsuite/icons";
import React, { useEffect } from "react";
import Overlay from "react-bootstrap";
import { Message, Nav } from "rsuite";
import NoticeIcon from "@rsuite/icons/Notice";
import TimeIcon from "@rsuite/icons/Time";
import EmailIcon from "@rsuite/icons/Email";
import { Context } from "../../Context/context";
import { useContext, useState, useReducer } from "react";
import ContenetDisplay from "../../Components/ConentDisplay/ConentDisplay";
import { issues, postComment, postIssue } from "../../API/Issues";
import SpeakerIcon from "@rsuite/icons/Speaker";
import CheckIcon from "@rsuite/icons/Check";
import MessageIcon from "@rsuite/icons/Message";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { cilOptions } from "@coreui/icons";

const endPoint = "http://localhost:3001";

const CommunicationsNav = () => {
  const { communications, setCommunications } = useContext(Context);
  return (
    <Container>
      <Row>
        <Col>
          <Nav appearance="tabs">
            <Nav.Item
              icon={<SpeakerIcon />}
              onSelect={() => {
                setCommunications("active");
              }}
            >
              Acitve Issue
            </Nav.Item>
            <Nav.Item
              icon={<NoticeIcon />}
              onSelect={() => {
                setCommunications("ScheduledMeetings");
              }}
            >
              Scheduled Meetings
            </Nav.Item>
            <Nav.Item
              icon={<MessageIcon />}
              onSelect={() => {
                setCommunications("Issue");
              }}
            >
              New Issue
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

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
  );
};

const Issue = () => {
  const States = ["Active", "Resolved", "Pending"];
  const socket = socketIOClient(endPoint);
  let new_temp = [];
  const [room, setRoom] = useState("");
  const [receivedMessages, setReceivedMessages] = useReducer(
    (state, newState) => {
      for (const index in state) {
        if (state[index].id == newState.id) return state;
      }
      return [...state, newState];
    },
    []
  );
  const [message, setMessage] = useState({
    title: "",
    Issue: "",
  });
  let cached_messages = [];

  const handleStatusChange = (event) => {
    const { name, value } = event.target;
  };

  const sendMessage = () => {
    // postIssue(message)
    socket.emit("send_message", message);
  };
  socket.on("messages", (data) => {
    let youCanAddMessage = true;
    cached_messages.forEach((message) => {
      if (message.id == data.id) youCanAddMessage = false;
    });
    if (!youCanAddMessage) return 0;
    setReceivedMessages(data);
  });
  useEffect(() => {
    cached_messages = receivedMessages;
  }, [receivedMessages]);

  const handleOnchangeEvent = (e) => {
    const temp = Object.assign(message, { [e.target.name]: e.target.value });
    setMessage(temp);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Raise Issue</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={(e) => {
                handleOnchangeEvent(e);
              }}
            ></Form.Control>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Issue</Form.Label>
          <Form.Control
            as="textarea"
            name="Issue"
            onChange={(e) => {
              handleOnchangeEvent(e);
            }}
          ></Form.Control>
        </Col>
      </Row>
      <Row></Row>
      <Row style={{ margin: "3px 0px 0px 0px" }}>
        <Col>
          <Button onClick={() => sendMessage("hello world")}>Raise</Button>
        </Col>
      </Row>
      {receivedMessages.map((t) => {
        return <h1>{t.title}</h1>;
      })}
    </Container>
  );
};

const ActiveIssues = () => {
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
  const { Communications, setCommunication } = useContext(Context);
  const pages = {
    ScheduledMeetings: ScheduledMeetings,
    Issue: Issue,
    active: ActiveIssues,
  };

  return (
    <Container>
      <CommunicationsNav />
      <ContenetDisplay content={pages[Communications]}></ContenetDisplay>
    </Container>
  );
};
export default Communications;
