import {Container,Row,Col,Form,Button} from 'react-bootstrap'
const SettingPage = ()=>{
    return(
        <Container>
            <Row>
                <Col>
                <h4>Edit Information</h4>
                    <Form>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text'></Form.Control>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email'></Form.Control>
                        <Form.Label>phone number</Form.Label>
                        <Form.Control type='number'></Form.Control>
                    
                    </Form>
                    <Button style={{margin:"10px 0px 0px 0px"}}>Update</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default SettingPage;