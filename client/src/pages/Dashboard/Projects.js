import {Container,Col,Row,Button, ButtonGroup, Table,ProgressBar} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { Modal } from 'react-bootstrap';
import { Activeprojects,postProject } from '../../API/Project'
import "rsuite/dist/rsuite.min.css";
import {Nav} from 'rsuite'
import AdvancedAnalyticsIcon from '@rsuite/icons/AdvancedAnalytics' ;
import PlusIcon from '@rsuite/icons/Plus';
import BarChartIcon from '@rsuite/icons/BarChart';
import ListIcon from '@rsuite/icons/List';
import TimeIcon from '@rsuite/icons/Time';
import ContenetDisplay from '../../Components/ConentDisplay/ConentDisplay';
import { useState,useContext } from 'react';
import Example from '../../Components/charts/PieChart'
import { Context,ContextProvider } from '../../Context/context';
// project manager is not required to enter the wbs,schedule and status upon creation.
//wbs will come from later modules and the schedule will be dervied from the wbs




const ProjectNav = ()=>
{
    const {Tabs,setTabs} = useContext(Context)
  return(
      <Container>
<Row>
    <Col>
        <Nav appearance='tabs' >
            <Nav.Item icon={<PlusIcon />} onSelect={()=>{setTabs("CreateProject")}}>Create Project</Nav.Item>
            <Nav.Item icon={<AdvancedAnalyticsIcon/>}  onSelect={()=>{setTabs("ActiveProjects")}}>Active Projects</Nav.Item>
            <Nav.Item icon={<BarChartIcon />} onSelect={()=>{setTabs("ProjectStatus")}}>Project Status</Nav.Item>
            <Nav.Item icon={<ListIcon />} onSelect={()=>{setTabs("CreateWbs")}}>Create WBS</Nav.Item>
            <Nav.Item icon={<TimeIcon />} onSelect={()=>{setTabs("Schedule")}} >Schedule </Nav.Item>
        </Nav>
    </Col>
</Row>
</Container>

  )
}

const CreateProject = ()=>{ 
    const [formData,setFormData] = useState(
    {
    projectname:'', 
    projectRepository:'', 
    budget:'',  
    duration:'',
    descripion:'' 
    })
    const handleChange=(event)=>{
        let newData = Object.assign(formData,{[event.target.name]:event.target.value})
        
       setFormData(newData)

    }

    return(
        <Container>
            <Form>
            <Row>
                <Col>
                <h5 style={{margin:"0px 10px 6px 0px"}}>Project Creation</h5>
                
                    <Form.Group>
                        <Form.Label>project Name</Form.Label>
                        <Form.Control type="text" name="projectname" onChange={handleChange} />
                        <Form.Label>Budget</Form.Label>
                        <Form.Control type="number" name="budget" onChange={handleChange}/>
                        <Form.Label>Duration(months)</Form.Label>
                        <Form.Control type="number" name='duration' onChange={handleChange}/>

                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Label>GitHub Repo</Form.Label>
                <Form.Control type='text' name="projectRepository" onChange={handleChange}/>
                <Form.Label>Project Discription</Form.Label>
                <Form.Control as="textarea" name="descripion" onChange={handleChange}/>
                </Col>
                <Row>
                <Col>
                <div style={{margin:"10px 0px 0px 0px", justifyContent:"end"}}>
                <Button variant="dark" onClick={()=>postProject(formData)}>Submit</Button>
                <Button variant="dark">Clear</Button>

                </div>
            

                </Col>

                </Row>
    
        
            </Row>
        </Form>
            
        </Container>
    )
}
const ActiveProjects = ()=>{
    return(
        <Container>
            <Row>
                <Col >
                <Row>
                    <h3>Budget</h3>
                    <Example></Example>
                </Row>
                </Col>  
                
                <Col>
                    <h3>Project Details</h3>
                    <ul>
                    <li><h6>project name:Bantu</h6></li>
                    <li><h6>status:active</h6></li>
                    <li><h6>Repo:github repo link</h6></li> 
                    </ul>
                    

                </Col>
                <Col>
              
                    <h3>Team memebers:</h3>
                    <ul>
                    <li><h6>abc</h6></li>
                    <li><h6>def</h6></li>
                    <li><h6>ghi</h6></li> 
                    </ul>
               
                </Col>

            </Row>
        </Container>
        
        )
    }
const ProjectStatus = ()=>{
    return(
        <Table>
        <thead>
            <tr>
            <th>#</th>
            <th>project Name</th>
            <th>Start date</th>
            <th>Completion date</th>
            <th>Progress</th>
            <th>note</th>
            </tr>
        </thead>
        <tr>
            <td>1</td>
            <td>bantu</td>
            <td>12/12/12</td>
            <td>12/1/14</td>
            <td><div style={{padding:"3px 0px 0px 0px"}}><ProgressBar now={60} variant="success"  label={60}></ProgressBar></div></td>
            
            <td>on schedule</td>
        </tr>
    </Table>
        )
    }
    const TaskModal = (props)=>{
        const [task,setTask] = useState([{task:''}])
        const handleChange = (index,event)=>{
            let data = [...task]
            data[index][event.target.name] = event.target.value
            setTask(data)
        }
        const addFields = ()=>{
            let newField = {task:''}
            setTask([...task,newField])
        }
        const Submit=(props)=>{
            
       
            return props.onHide
        }
        const removeFields=(index)=>{
            if(task.length === 1){
                setTask([{task:''}])
            }
            else{
                let data = [...task]
                data.splice(index,1)
                setTask(data)

            }

        }
        return(
            <Modal
            {...props}
            size="lg"
            >
                
                <Modal.Header closeButton >
                    <Modal.Title>
                        Add subtasks
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}> 
                        <Form>
                        {task.map((input,index)=>{
                            return(
                                
                                <Row key={index} style={{margin:"5px 0px 0px 0px"}}>
                                <Col xs={6}>
                                <Form.Control type='text' name='task'
                                value={input.task}
                                onChange={event=>handleChange(index,event)}
                                
                                >

                                </Form.Control>
                                
                                </Col>
                                <Col xs lg="2">
                                    <ButtonGroup>
                                     <Button onClick={addFields} style={{margin:"0px 5px 0px 0px"}}>Add subtask</Button>
                                    <Button onClick={()=>removeFields(index)} variant="danger" >remove subtask</Button>


                                    </ButtonGroup>

                                </Col>

                                </Row>

                            )
                        })}
                        </Form>
                        
                        </Col>
                        <Button onClick={()=>{Submit(props)}} 
                        style={{margin:'30px 0px 0px 0px'}}
                        >
                            Create subtasks
                            </Button>         
                    </Row>
                </Modal.Body>
            </Modal>
        )

    }

    const CreateWbs = ()=>{
        const [show,setShow] = useState(false)
      
        return(
            <div>
                <h1>Work Break Down Structure</h1>
            <Container>
                <Col sm={6}>
                    <Form.Select>
                        <option>Select project</option>
                    </Form.Select>
                </Col>
                <Col sm={6}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text'></Form.Control>
                    <Button style={{marginTop:"10px"}} onClick={()=>{setShow(true)}}>Add sub tasks</Button> 
                    <TaskModal 
                    show={show}
                    onHide={()=>{setShow(false)}}
                    >

                    </TaskModal>
                    <br />
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type='text'></Form.Control>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type='text'></Form.Control>
                    <div style={{marginTop:"10px"}}>
                    <Button>Add</Button> 
                    </div>
                    
                </Col>
            </Container>
            </div>
            )
        }
        const Schedule = ()=>{
            return(
                <h1>schedule</h1>
                )
            }
            const pages = {
                "CreateProject":CreateProject,
                "ActiveProjects": ActiveProjects,
                "ProjectStatus":ProjectStatus ,
                "CreateWbs":CreateWbs,
                "Schedule":Schedule
    
    
}
const Projects=()=>{
    const {Tabs,setTabs} = useContext(Context)
    
    return(
        <>
        
        <ProjectNav />
        <ContenetDisplay content={pages[Tabs]}> 
        </ContenetDisplay>
       
        
        </>
        
    )
}
export default Projects;    