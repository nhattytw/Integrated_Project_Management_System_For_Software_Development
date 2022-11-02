import { Container,Col,Row,Button } from "react-bootstrap";
import { NavBar } from "../nav/nav";
import Form from "react-bootstrap/Form"


export const LoginPage=()=>{
    return(
        <>
            <NavBar />
            <Container fluid className="login" style={{margin:"10% 0 0 25%",width:"50%",justifyContent:"center"}} >
                <Row >
            
                    <Col style={{textAlign:"Center",marginTop:"10px"}}>
                    <h5>Login</h5>
                    <Form className="Login-Form">
                            <Form.Group style={{width:"150px"}} className="Login-Form">
                                <Form.Control type="text" placeholder="Email" className="Login-form-elt" style={{width:"450px"}}></Form.Control>
                                <Form.Control type="Password" placeholder="Password" className="Login-form-elt" style={{width:"450px",minWidth:"100px"}}></Form.Control>
                                <Button variant="link" style={{marginLeft:"230%"}}>Forgot Password ?</Button>
                                <Button variant="dark" style={{marginLeft:"250%",
                                padding:"15px",
                                width:"120px"
                            }}>Login</Button>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}