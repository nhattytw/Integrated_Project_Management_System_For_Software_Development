import { AssignmentContext, Context } from "../../../Context/context";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Table,
  Accordion,
  Tab,
  FormText,
  
} from "react-bootstrap";
import { CheckTreePicker, Toggle } from "rsuite";
import { Nav } from "rsuite";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import PauseRoundIcon from "@rsuite/icons/PauseRound";
import PeoplesIcon from "@rsuite/icons/Peoples";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import ContenetDisplay from "../../../Components/ConentDisplay/ConentDisplay";
import { postCompletedTask } from "../../../API/Assignments";

const AssignemtsNav = () => {
  const { Assignment, setAssignment } = useContext(Context);
  return (
    <Container>
      <Row>
        <Col>
          <Nav appearance="tabs">
            <Nav.Item
              icon={<PauseRoundIcon />}
              onSelect={() => {
                setAssignment("PendingAssignments");
              }}
            >
              Pending Assignments
            </Nav.Item>
            <Nav.Item
              icon={<CheckRoundIcon />}
              onSelect={() => {
                setAssignment("CompletedAssgnement");
              }}
            >
              Completed Assignments
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

const PendingAssignments = () => {
  const [activeAssignments, setAssignment] = useState([]);
  const [projects,setProjects] = useState([])
  const [doneAssignements, setDoneAssignments] = useState([])
  const [disabled,setDisabled] = useState(false)
  const [selectedProject,setSelectedProject] = useState("")
  const [title,setTitle] = useState("")
  
  const props = {
    disabled:disabled
  }
  const base_url = "http://localhost:9000/api/";

  useEffect(() => {
    axios({
      method:'post',
      url:base_url.concat('project/myprojects'),
      data:{
        username:localStorage.getItem('userName')
      }
    })
   
  }, []);
  const getProjects = (e)=>{
      axios.post(base_url + "project/findProject",
     {"project":e.target.value  }
      ).then((response)=>{
        if(response.status === 200){
          setAssignment(response.data[0].wbs.task)
          setSelectedProject(e.target.value)
          
        }
      }).catch((error)=>{
        console.log(error)
      })
  }
  const handleCheck=(e,title)=>{
    let value = e.target.value
    if(doneAssignements.includes(value))
    {
      let newlist = doneAssignements.filter(x => x !== value)
       setDoneAssignments(newlist)
    }
    else{
      let temp = [...doneAssignements,e.target.value]
      setDoneAssignments(temp)

    }
    setTitle(title)

    
  }
  const postComplete=()=>{
    const taskDetail ={ 
      ProjectName:selectedProject, 
      title:[title], 
      finishedTask:doneAssignements 
    }
    postCompletedTask(taskDetail)
  }

  return (
    <Container>
      <Row>
        <Col xs={5}>
        <Form.Label>select project</Form.Label>
        <Form.Select title="Select project" onChange={(e)=>{getProjects(e)}} >
          <option></option>
         {projects.map((project)=>{
          return(
            <option>{project}</option>
          )
         })}
            
           </Form.Select >

          
        </Col>
      </Row>
      <Row>
        <Col>
          {activeAssignments.map((active)=>{
            return(
              <Accordion style={{margin:'10px 0px 0px 0px'}}>
                <Accordion.Header>{active.title}</Accordion.Header>
                <Accordion.Body>
                  {active.tasks.map((t)=>{
                    return(
                      <>
                      <Row>
                      <Col>
                      <p>{t}</p>
                      </Col>
                      <Col>
                      <input type="checkbox"  value={t} onChange={(e)=>handleCheck(e,active.title)} />
                      </Col>
                  </Row>
                      
                      </>

                    )
                  })}
                  <Button variant="success" style={{float:'right',margin:'5px 0px 5px 0px'}} onClick={()=>{postComplete()}}>Completed</Button>
              </Accordion.Body>
              </Accordion>
            )
          })}

        </Col>
      </Row>
    </Container>
  );
};
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
                <th>Date Assigend</th>
                <th>Date Completed</th>
                <th>schedule</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
const pages = {
  PendingAssignments: PendingAssignments,
  CompletedAssgnement: CompletedAssignments,
};

const Assignments = () => {
  const { Assignment, setAssignment } = useContext(Context);
  return (
    <>
      <AssignemtsNav />
      <ContenetDisplay content={pages[Assignment]}></ContenetDisplay>
    </>
  );
};

export default Assignments;
