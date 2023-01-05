import {Container,Row,Col,Form,Table,Card,Button} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import {Nav} from 'rsuite'
import PeoplesMapIcon from '@rsuite/icons/PeoplesMap';
const some = [1,2,3,4,5,5,3,23,42,34,23,2342,34,423,4234,2342,34,423,4234]

const TeamNav = ()=>{
    return(
        <Container>
        <Row>
            <Col>
                <Nav appearance='tabs' >
                    <Nav.Item icon={<PeoplesMapIcon />} >Create Teams</Nav.Item>
                   
                    {/* <Nav.Item onSelect={() => { setCommunications("ScheduleMeetings") }}>Schedule Meeting</Nav.Item> */}
    
                </Nav>
            </Col>
        </Row>
    </Container>
)
    
}
const CreateTeams = ()=>{
    return(
        <Container>
            <Row>
                <Col>
                <Form>
                    <Form.Control type='text'></Form.Control>
                </Form>
                </Col>
                <Col>
                    <Button>add</Button>
                </Col>
            </Row>
            <Row style={{margin:"20px 0px 0px 0px"}}>
                <Table>
                    <th>username</th>
                </Table>
            </Row>
        </Container>
    )
}
const Teams = ()=>{
    return(
        <>
        <TeamNav />
       
        <CreateTeams />
        
        </>
    )
  
}

export default Teams