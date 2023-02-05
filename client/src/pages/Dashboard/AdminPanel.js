import "../../Styles/dashboard.css"
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { Container,Row,Col,Card,Form,Button } from "react-bootstrap";
import NavItem from "rsuite/esm/Nav/NavItem";
import { Nav } from "rsuite";
import { Context } from "../../Context/context";
import Clock from 'react-live-clock';
import React from "react";
import { postComment } from "../../API/Issues";
import  ContenetDisplay  from "../../Components/ConentDisplay/ConentDisplay";
const Header = ()=>{
    let x = new Date()
    return(
        <Container>
            <Row>
                <Col xs lg="0" >
                    <h3>Welcome  {localStorage.getItem("userName")}</h3>
                </Col>
                <Col xs lg="2">
                    <Clock style={{float:"right",fontSize:"20px"}} className="adminClock" format={'HH:mm:ss'}  ticking={true} timezone={'Africa/Addis_Ababa'} />
                </Col>
            </Row>
            <div style={{float:"right",fontSize:"40px"}}>
                    {/* <h1 style={{float:"right",fontSize:"40px"}}>{x.getMonth()}/{x.getDate()}/{x.getFullYear()}</h1> */}
                    

            </div>
       
        </Container>
    )
}
const ProjectNav = () => {

    const { adminPages,setAdminPages } = useContext(Context)
    return (
        <>
        
        <Nav appearance="tabs" pullRight>
        
        <Nav.Item eventKey="home"  onSelect={()=>{setAdminPages("projects")}}>
        Your Projects
        </Nav.Item>
        <Nav.Item eventKey="news" onSelect={()=>{setAdminPages("Issues")}}>Issues</Nav.Item>
        <Nav.Item eventKey="solutions">Teams</Nav.Item>
        <Nav.Item eventKey="products">Meetings</Nav.Item>
       
      </Nav>
        
        </>
    )
}
//add padding to the cards
const AllProjects=()=>{
    const [allProjects,setallProjects] = useState([])
    const [count,setCount] = useState(0)
    useEffect(()=>{
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
    },[])
    console.log(allProjects)
    return(
        <Container>
            <Row className="projectDisplayHeader">
            <Col># |</Col>
            <Col>Project Name</Col>
            <Col>Duration</Col>
            <Col>Repository</Col>
            <Col>Status</Col>
            <Col>Created At</Col>
            </Row>
            {allProjects.map((project,index)=>{
                
                return(
                    <Row className="projectDisplay">
                        <Col>{index+=1}</Col>
                        <Col>{project.projectName}</Col>
                        <Col>{project.duration}</Col>
                        <Col>{project.projectRepository}</Col>
                        <Col><li style={{color:'green'}}>{project.status}</li></Col>
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
    


const AdminPanel = ()=>
{
    const {adminPages,setAdminPages} = useContext(Context)
    const pages = {
        "projects": AllProjects,
        "Issues":Issues ,
        
    }
    return(
        <>
        <Header />
        <ProjectNav />
        <ContenetDisplay content={pages[adminPages]}>

        </ContenetDisplay>
       
        
        </>
    )
}
export default AdminPanel;