import { Container, Row, Col, Card, Button, Accordion,Form } from "react-bootstrap";
import "../../Styles/dashboard.css";
import axios from "axios";
import { useEffect,useState } from "react";
import React from "react";
import { postComment } from "../../API/Issues";
const ResolvedIssues=()=>{
  const options = "Resolved"
  const [allIssues, setActiveIssues] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api//Issues/getResolvedIssues")
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
    if (props.display) {const resolvedIssues = ()=>{
  
    }
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
    const status = ['Resolved']

    const handleStatusChange = (id)=>{
      axios({
        method:'post',
        url:'http://localhost:9000/api/Issues/setIssueResolved',
        data:{id:id}
    }).then((response)=>{
      console.log(response.data)
    setActiveIssues([response.data])
    })
    }
    return (
      <Card style={{ margin: "10px 0px 0px 0px", padding: "10px" }}>
        <Card.Title>
          <Row>
            <Col>
              <h3>{props.title}</h3>
            </Col>
            <Col sm={4}>
              <p>Date:{props.createdAt}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <p>PostedBy:{props.postedBy}</p>
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


const AdminPanel = () => {
  return (
    <>
    <h5>welcome,{localStorage.getItem("userName")}</h5>
      <ResolvedIssues />
    </>
  );
};
export default AdminPanel;
