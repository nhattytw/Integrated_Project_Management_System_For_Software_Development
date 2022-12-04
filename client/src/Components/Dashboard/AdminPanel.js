import { Container,Row,Col,Card ,Button,Accordion} from "react-bootstrap";
import {BarChart, Bar ,XAxis,YAxis,Legend,PieChart,Pie} from 'recharts'

import "../../Styles/dashboard.css"
import { ProjectBudgetData } from "../../API/Budgetdata";
import { teams } from "../../API/Teams";
import { assignments } from "../../API/Assignments";
import { issues } from "../../API/Issues";

const BudgetSummary = () =>{
    return(
        <Container style={{padding:"0px",margin:"45px 0px 0px 0px"}}>
                <Row > 
                    <Col className="summary">
                    <h4 style={{overflowWrap:"nowrap"}}> Budget:12,000</h4>
                    <h5>Total Spent: 1,100</h5>
                    <button id="btn-get-started" style={{margin:"0px 0px 0px 0px"}}>Budget</button>
                    </Col>
                </Row>
        </Container>
    )
}
const BudgetGraph = ()=>{
    return(

    <Container>
        <Row>
            <Col >
                <BarChart width={730} height={250} data={ProjectBudgetData}> 
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Legend />
                    <Bar dataKey="budget" fill="#8884d8" />
                    <Bar dataKey="spent" fill="#82ca9d" />
                </BarChart>
            </Col>
          

         </Row>
    </Container>
     

    )
}


const ActiveProjects = ()=>
{
    return(
        <Container  >
            <Row>
                {ProjectBudgetData.map((project)=>{
                    return(
                    <Col >
                    <Card bg="dark" border="dark" className="ProjectDesc" style={{color:"#fff"}}> 
                        <Card.Title><h3>{project.name}</h3></Card.Title>
                        <Card.Subtitle><h5 className="secondary">{project.budget}</h5></Card.Subtitle>
                        <Card.Body><p>Short Describtion of the project </p></Card.Body>
                        <Button variant="light" style={{margin:"0px 10px 10px 10px"}}>Go to project</Button>
                    </Card>
                        
                        
                        
                    </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
const WorkStatus=()=>{
    return(
        <Container>
            <Row>
                <Col xs={6}>
                   <h3>Active Assignments</h3>
                </Col>
                <Col xs={6}>
                <h3>issues</h3>
                </Col>
            </Row>
        </Container>
    )
}
const Teams = ()=>
{
    return (
    <Container>
        <Row>
            <Col><h3>Teams</h3></Col>
        </Row>
        <Row>
            <Col>
            {teams.map((team)=>{
                return(
            <Accordion>
                <Accordion.Header>{team.name}</Accordion.Header>
                <Accordion.Body>
                    <h3>memebers</h3>
                    {team.memebers.map((memeber)=>{
                        return(
                        <ul>
                            <li>{memeber}</li>
                        </ul>
                        )
                    })}
                
                </Accordion.Body>
            </Accordion>

                )
            })}
            </Col>
        </Row>
    </Container>
    )
}
const AdminPanel = ()=>
{
    return(
        <>
       
        <Container>
            <Row >
                <Col >
                    <BudgetSummary />
                </Col>
                <Col xs={8}>
                    <BudgetGraph />
                </Col>
                <Col>
                  <h1>insert piechart</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ActiveProjects />
                </Col>
            </Row>
            <Row>
                <Col>
                <WorkStatus />
                </Col>
            </Row>
            <Row>
                <Col>
                <Teams />
                </Col>
            </Row>
        </Container>
        </>
    )
}
export default AdminPanel;