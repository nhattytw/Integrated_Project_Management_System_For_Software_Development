import { Container,Col,Row,Button } from "react-bootstrap";
import { NavBar } from "../nav/nav";
import { Form } from "react-bootstrap"
import people from '../Assets/BuissnessPeople.png'


 const LoginPage=()=>{
    return(
        <>       <NavBar />  
            
                <Form className="login"> 
                    <Container >
                        <Row>
                            <Col>
                                <img src={people} style={{margin:"0px 0px 0px 75px"}}/>
                            <h2 style={{margin:"0px 0px 0px 95px"}}>Welcome Back</h2>
                            <hr ></hr>
                            <Form.Group className='d-grid gap-2'> 
                            <Form.Control type="email" placeholder="Email" />
                            <Form.Control type="password" placeholder="Password" />
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
