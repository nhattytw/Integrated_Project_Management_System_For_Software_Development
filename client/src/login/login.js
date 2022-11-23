import { Container,Col,Row,Button } from "react-bootstrap";
import { NavBar } from "../nav/nav";
import { Form } from "react-bootstrap"
import people from '../Assets/people.png'


 const LoginPage=()=>{
    return(
        <>       <NavBar />  
            
                <Form className="login"> 
                    <Container>
                        <Row>
                            <Col>
                                <img src={people} />
                            </Col>
                            <Col>
                            <div className="login-text-elt">
                        
                            <h2>Welcome Back</h2>
                            </div>
                            <hr ></hr>
                            <Form.Group className='d-grid gap-2'> 
                            <Form.Control type="email" placeholder="Email" />
                            <Form.Control type="password" placeholder="Passoword" />
                            <Button  size="lg" variant="secondary" className="login-btn">
                                Login
                            </Button>
                            <a href="#" style={{textAlign:"center"}}>Forgot password ?</a>
                    </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Form>

                
            

                
        </>
    )
    
}
export default LoginPage;
