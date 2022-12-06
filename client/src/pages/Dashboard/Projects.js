import {Container,Col,Row, NavItem, Button, ButtonGroup} from 'react-bootstrap'
import { ProjectNav } from '../../Components/nav/nav'
import Form from 'react-bootstrap/Form'
import { Activeprojects } from '../../API/Activeprojects'
import "rsuite/dist/rsuite.min.css";
import Example from '../../Components/charts/PieChart';
// project manager is not required to enter the wbs,schedule and status upon creation.
//wbs will come from later modules and the schedule will be dervied from the wbs
const CreateProject = ()=>{ 
    return(
        <Container>
            <Form>
            <Row>
                <Col>
                <h5 style={{margin:"0px 10px 6px 0px"}}>Project Creation</h5>
                
                    <Form.Group>
                        <Form.Label>project Name</Form.Label>
                        <Form.Control type="text"/>
                        <Form.Label>Budget</Form.Label>
                        <Form.Control type="number"/>
                        <Form.Label>Duration(months)</Form.Label>
                        <Form.Control type="number"/>
                        <Form.Label>Project manager</Form.Label>
                        <Form.Select>
                            <option>project manager</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Label>GitHub Repo</Form.Label>
                <Form.Control type='text' />
                </Col>
                <Col>
                <Form.Label>GitHub Organization</Form.Label>
                <Form.Control type='text' />
                <div style={{margin:"15px 0px 0px 0px", justifyContent:"end"}}>
                <Button variant="dark">Submit</Button>
                <Button variant="dark">Clear</Button>

                </div>
            
                </Col>
            </Row>
        </Form>
            
        </Container>
    )
}
const ActiveProjects = ()=>{
    return(
        <Container>
            <Row>
                <h1>Hello</h1>
                <Col>
                {Activeprojects.map((key,value)=>{
                        
                })}
                </Col>
            </Row>
        </Container>
        
    )
}
const ProjectStatus = ()=>{
    return(
        <h1>project status</h1>
    )
}

const Projects=()=>{
    return(
        <>
        <ProjectNav />
        <CreateProject />
        
        </>
        
    )
}
export default Projects;    