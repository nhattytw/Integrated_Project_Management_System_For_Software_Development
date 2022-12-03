import {Container,Col,Row,Form,Button, ButtonGroup} from 'react-bootstrap'
import { renderMatches } from 'react-router-dom';
import { NavBar } from '../nav/nav';



const RegistrationPage = ()=>{
    const Months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return(
        <div>
        <NavBar />
        
        <Container className='login'>
            
            <Row>
                <Col><h3>peronal Details</h3>
                <hr />
                </Col>
            </Row>
            <Row>
            
                <Col>
                    <Form>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='"text' placeholder='First Name' />
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='"text' placeholder='Last Name' />
                    </Form>
                </Col>
            </Row>
            {/* restrict date range based on month some have 30 and others have 31 */}
            
            <Row>
                <Col>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label placeholder='months' >Date Of Birth</Form.Label>
                            <Form.Select >
                                {Months.map((month)=>{
                                    return(
                                    <option value={month}>{month}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Col>

                
            </Row>
            <Row>
            <Col>
                <Form.Control type='number' placeholder='Date'></Form.Control>
                </Col>
                <Col>
                    <Form.Control type='number' placeholder='Year'></Form.Control>
                </Col>

            </Row>
            <Row>
                <Col><h3>Account Details</h3>
                <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                <Form>
                        <Form.Label>phone numner</Form.Label>
                        <Form.Control type='Number' placeholder='Phone Number' />
                    </Form>
                </Col>
                <Col>
                <Form>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='Email' placeholder='Email' />
                    </Form>
                </Col>

            </Row>
            <Row>
            <Col>
                <Form>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' placeholder='Username' />
                    </Form>
                </Col>
                <Col>
                <Form>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='select' placeholder='password' />
                    </Form>
                </Col>
            </Row>
            <Row style={{padding:"12px 0px 0px 0px"}}>
                <Col style={{padding:"0px 0px 0px 10px"}}>
                    <ButtonGroup style={{float:"right",padding:"0px 30px 0px 0px"}}>
                    <Button variant='dark' style={{margin:"0px 8px 0px 0px"}}>Register</Button>
                    <Button variant='dark'>Cancel</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default RegistrationPage;