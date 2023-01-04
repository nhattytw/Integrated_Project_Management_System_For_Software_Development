import { Container,Row,Col,Card ,Button,Accordion} from "react-bootstrap";
import {BarChart, Bar ,XAxis,YAxis,Legend,PieChart,Pie} from 'recharts'
import Example from "../../Components/charts/PieChart";
import "../../Styles/dashboard.css"
import { ProjectBudgetData } from "../../API/Budgetdata";
import { teams } from "../../API/Teams";
import { assignments } from "../../API/Assignments";
import { issues } from "../../API/Issues";

//add padding to the cards
const MeetingSummary = ()=>
{
    return(
        <Container>
            <Row>
                <h3>Upcoming Meetings</h3>
                <Col>
                <Card >
                <Card.Body>
                    <Card.Title>meeting with font end team</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nulla facilisi etiam dignissim diam quis enim lobortis. 
                    Cursus mattis molestie a iaculis at erat pellentesque. Nulla malesuada pellentesque elit eget gravida cum sociis.
                    <h5>date:12/12/12</h5>
                    <h5>time:1:20</h5>
                    <h5>Participating teams:front End team</h5>
                    </Card.Text>
                </Card.Body>
            </Card>
                </Col>
                <Col>
                <Card>
                <Card.Body>
                    <Card.Title>meeting with font end team</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nulla facilisi etiam dignissim diam quis enim lobortis. 
                    Cursus mattis molestie a iaculis at erat pellentesque. Nulla malesuada pellentesque elit eget gravida cum sociis.
                    <h5>date:12/12/12</h5>
                    <h5>time:1:20</h5>
                    <h5>Participating teams:front End team</h5>
                    </Card.Text>
                </Card.Body>
            </Card>
                </Col>
                <Col>
                <Card>
                <Card.Body>
                    <Card.Title>meeting with font end team</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nulla facilisi etiam dignissim diam quis enim lobortis. 
                    Cursus mattis molestie a iaculis at erat pellentesque. Nulla malesuada pellentesque elit eget gravida cum sociis.
                    <h5>date:12/12/12</h5>
                    <h5>time:1:20</h5>
                    <h5>Participating teams:front End team</h5>
                    </Card.Text>
                </Card.Body>
            </Card>
                </Col>
            </Row>

        </Container>
    )

}
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
                <BarChart width={730} height={350} data={ProjectBudgetData}> 
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Legend />
                    <Bar dataKey="budget" fill="rgba(66,105,158)" />
                    <Bar dataKey="spent" fill="#82ca9d" />
                </BarChart>
                
            </Col>
          <Col>
          
          </Col>

         </Row>
    </Container>
     

    )
}


const ActiveProjects = ()=>
{
    return(
        <Container  >
            <h3>Active Projects</h3>
            <Row>
                {ProjectBudgetData.map((project)=>{
                    return(
                    <Col >
                    <Card border="dark" className="ProjectDesc" style={{color:"#fff",backgroundColor:"rgba(66,105,158)"}}> 
                        <Card.Title><h3>{project.name}</h3></Card.Title>
                        <Card.Subtitle><h5 className="secondary" style={{color:"#fff"}}>{project.budget}</h5></Card.Subtitle>
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
                {issues.map((issue)=>{
                    return(
                        <>
                        <h6>{issue.project}</h6>
                       <ul>
                        {issue.issue.map((i)=>
                        {return(
                            <li>{i}</li>
                        )
                        })}
                       </ul>
                       </>
                       
                    )
                })}
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
const Parent=()=>{
    return(
        <Container>
            <Row>
                <Col><h3>Dashboard</h3></Col>
            </Row>
            <Row>
                <Col>
                    <ActiveProjects />
                </Col>
            </Row>
    
            <Row>
            <Col><h3>Budget Summary</h3></Col>
            </Row>
            <Row >

                <Col >
                <BudgetGraph />
                </Col>
                <Col>
               
                </Col>
            </Row>
            <Row>
                <Col>
                    <MeetingSummary />
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
    )
}
const AdminPanel = ()=>
{
    return(
        <>
       <Parent />
        
        </>
    )
}
export default AdminPanel;