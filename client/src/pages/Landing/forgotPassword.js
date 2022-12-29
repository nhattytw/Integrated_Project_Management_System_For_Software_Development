import {Container,Col,Row,Form,Button} from 'react-bootstrap'
import { NavBar } from '../../Components/nav/nav';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

 const ForgotPassword=()=>{
    const [variant,setVariant] = useState('success')
    const [show,setShow] = useState(false)
    const [message,setMessage] = useState('Password change successful')
    const handleSubmit =(event)=>{
        event.preventDefault();
        const oldpass = event.target.elements.oldpass.value.trim();
        const newpass =event.target.elements.newpass.value.trim();
        const conpass = event.target.elements.conpass.value.trim();

        if(conpass === newpass){
            setShow(true)
            setVariant("success")
           setMessage("password match, password changed successfully")
        }
        else{

           setShow(true)
           setVariant("danger")
           setMessage("password dont match,passowrd change failed")
        }
        setTimeout(() => {
         setShow(false)
     }, "3000")
    }
 return(
    <>
    <NavBar></NavBar>

    <Alert show={show} variant={variant}><p style={{textAlign:'center'}}>{message}</p></Alert>
    
    <Container >
        <Form onSubmit={handleSubmit} className='forgotPass' style={{padding:'100px'}}>  
        <h4 >forgot password</h4>
            <Form.Label>Enter your previous password</Form.Label>
            <Form.Control type="password" name='oldpass'></Form.Control>
            <Form.Label>Enter New  password</Form.Label>
            <Form.Control type="password" name="newpass"></Form.Control>
            <Form.Label>Confirm new password</Form.Label>
            <Form.Control type="password" name='conpass'></Form.Control>

            <Button style={{margin:"5px 0px 0px 0px"}} type="submit">confirm</Button>

        </Form>
    </Container>
    </>
 )
}
export default ForgotPassword