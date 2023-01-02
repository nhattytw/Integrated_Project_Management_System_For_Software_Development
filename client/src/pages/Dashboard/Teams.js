import {Container,Row,Col,Form,Table,Card} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import {Nav} from 'rsuite'
const some = [1,2,3,4,5,5,3,23,42,34,23,2342,34,423,4234,2342,34,423,4234]

const AssignProjectToTeam = ()=>{
    return(
        <Container>
            <Row>
                
                <Col xs={3}>
                    <Form.Label>Select Project</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle >Select project</Dropdown.Toggle>
                    </Dropdown>
                </Col>
                <Col xs={3}> 
                <Form.Label>Select team</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle >Select team</Dropdown.Toggle>
                    </Dropdown>
                </Col>
               
            </Row>
            <Row style={{margin:"10px 0px 10px 0px"}}>
                <h3>assigned project</h3>

            </Row>
            <Row>
            {
                some.map((x)=>{
                    return(

                        <Col>
                            <Card>
                                <Card.Body>
                                    Lorem
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
            }
            </Row>
        </Container>
    )
}
const Teams = ()=>{
    return(
        <>
        <TeamNav />
        <AssignProjectToTeam />
        
        </>
    )
  
}

export default Teams