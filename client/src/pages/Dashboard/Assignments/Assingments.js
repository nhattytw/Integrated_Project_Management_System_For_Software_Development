import { AssignmentContext,Context } from "../../../Context/context";
import {Container,Col,Row,Form,Button,Table, Tab} from 'react-bootstrap'
import {CheckTreePicker,Toggle }from "rsuite";
import {Nav} from 'rsuite'
import CheckRoundIcon from '@rsuite/icons/CheckRound'; 
import PauseRoundIcon from '@rsuite/icons/PauseRound';
import PeoplesIcon from '@rsuite/icons/Peoples';
import { useContext, useState } from "react";
import ContenetDisplay from "../../../Components/ConentDisplay/ConentDisplay";
const AssignemtsNav=()=>{
    const {Assignment,setAssignment}= useContext(Context) 
    
    return(
  <Container>
  <Row>
      <Col>
          <Nav appearance='tabs' >
              <Nav.Item icon={<PeoplesIcon/>} onSelect={()=>{setAssignment("AssignTaskToTeam")}}>Asign task to team</Nav.Item>
              <Nav.Item icon={<CheckRoundIcon />} onSelect={()=>{setAssignment("CompletedAssgnement")}}>Completed Assignemts</Nav.Item>
              <Nav.Item icon={<PauseRoundIcon /> } onSelect={()=>{setAssignment("PendingAssignments")}}>Pending Assignments</Nav.Item>
  
          </Nav>
      </Col>
  </Row>
  </Container>
    )
  }
  const AssignTaskToTeam =()=>{
    const [cascade, setCascade] = useState(false);
    return (
        <Container>
            <Row>
                <Col>
                <h4>Assign Task</h4>
                    <Form>
                    <Form.Label>Project</Form.Label>
                        <Form.Select>
                            <option>select Project</option>
                            <option>
                            </option>
                        </Form.Select>
                        <Form.Group>
                            <Form.Label>Teams </Form.Label>
                        <Form.Select>
                            <option>select team</option>
                            <option>Team 1</option>
                            <option>Team 2</option>
                        </Form.Select>

                        

                        </Form.Group>
                        <div style={{margin:"12px 0px 30px 0px"}}> 
                        <Button variant='dark' >Assign</Button>
                        <Button variant='dark' >clear</Button>
                        </div>
                    </Form>
                </Col>
                <Col style={{margin:"0px 0px 0px 18px"}}>
                
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
                    </Table>
                </Col>            
                </Row>
        </Container>
    )
  }
  const PendingAssignments =()=>{
    return(
        <h4>Completed Assignments</h4>
    )
  }
  const CompletedAssignments =()=>{
    return(
  
            
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


    )
  }
  const pages = {
      "PendingAssignments":PendingAssignments,
      "CompletedAssgnement":CompletedAssignments,
      "AssignTaskToTeam":AssignTaskToTeam
  }
const Assignments =()=>{
    const {Assignment,setAssignment} = useContext(Context)
    console.log(Assignment)
    return(
        <>
        <AssignemtsNav />
        <ContenetDisplay content={pages[Assignment]}>
        </ContenetDisplay>
        
        </>
    )
}

export default Assignments;