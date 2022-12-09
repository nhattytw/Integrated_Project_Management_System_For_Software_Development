import {Container,Col,Row,Form,Button,Table, Tab, Dropdown, ButtonGroup} from 'react-bootstrap'
import Overlay from 'react-bootstrap';
import {Nav} from 'rsuite'
import NoticeIcon from '@rsuite/icons/Notice';
import TimeIcon from '@rsuite/icons/Time';
import { Context } from '../../Context/context';
import { useContext } from 'react';
import ContenetDisplay from '../../Components/ConentDisplay/ConentDisplay';
const CommunicationsNav=()=>{
    const {Communications,setCommunications} = useContext(Context)
    return(
  <Container>
  <Row>
      <Col>
          <Nav appearance='tabs' >
              <Nav.Item icon={<NoticeIcon />} onSelect={()=>{setCommunications("ScheduledMeetings")}} >Scheduled Meetings</Nav.Item>
              <Nav.Item icon={<TimeIcon/>} onSelect={()=>{setCommunications("ScheduleMeetings")}}>Schedule Meeting</Nav.Item>
          </Nav>
      </Col>
  </Row>
  </Container>
)}
const ScheduleMeetings = ()=>{
    return(
        <Container>
            <Row>
                <Col>
                <h3>Schedule Meetings</h3>
                <p>meetings will be scheduled on google meets</p>
                </Col>
            </Row>
            <Row style={{margin:"12px 0px 0px 0px"}}>
                <Col >
                    <Form >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text'></Form.Control>
                    </Form>
                </Col>

            </Row>
            <Row style={{margin:"12px 0px 0px 0px",padding:"0px 10px 0px 0px"}}>
            <h3 style={{padding:"0px 5px 10px 0px"}}>Schedule</h3> 
            <ButtonGroup>
            <Dropdown>
                    <Dropdown.Toggle>Start date</Dropdown.Toggle>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle>start time</Dropdown.Toggle>
                </Dropdown>
                <p style={{fontSize:"20px",padding:"0px 0px 0px 5px"}}>to</p>
                <Dropdown>
                    <Dropdown.Toggle>end time</Dropdown.Toggle>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle>end date</Dropdown.Toggle>
                </Dropdown>
            </ButtonGroup>
            <Col style={{margin:"10px 0px 2px 0px"}}>
            <Dropdown.Toggle>Frequency</Dropdown.Toggle>
            </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} cols={13}></Form.Control>
                </Col>
                <Col style={{margin:"50px 0px 2px 0px"}}>
                    <Button variant='dark'>Schedule Meeting</Button>
                    <Button variant='dark'>cancel</Button>
                </Col>
            </Row>
            
        </Container>
    )
}
const ScheduledMeetings = ()=>{
    return(
        <Container>
            <Row>
                <Col>
                <h4>Scheduled Meetings</h4>
                <Table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Participant/s</th>
                        <th>Start time</th>
                        <th>Completion time</th>
                        <th>date</th>
                        </tr>
                    </thead>
                </Table>
                </Col>
            </Row>
           </Container>
    )
}

const Communications = ()=>{
    const {Communications,setCommunication} = useContext(Context)
    const pages = {
        "ScheduleMeetings":ScheduleMeetings,
        "ScheduledMeetings":ScheduledMeetings
    }

    return <Container>
        <CommunicationsNav />
        <ContenetDisplay content={pages[Communications]}>

        </ContenetDisplay>
    </Container>
}
export default Communications;