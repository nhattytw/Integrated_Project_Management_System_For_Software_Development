import {Container,Row,Col,Form,Table,Card,Button} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import axios from 'axios';
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
    const [developers,setDevelopers] = useState([])
    const url ='http://localhost:9000/api/Teams/getDeveloper'
    useEffect( ()=>{
        axios.get(url).then((response)=>{
            setDevelopers(response.data)
            
        })
     
      
    },[])
    const onCheckBoxClicked=(event)=>{
       
            console.log(event.target)

     

    }
    return(
        <Container>
            <Row>
                <Col>
                <Form>
                    <Form.Control type='text'></Form.Control>
                </Form>
                </Col>
                <Col>
                    <Button>Search</Button>
                </Col>
            </Row>
            <Row style={{margin:"20px 0px 0px 0px"}}>
                <Table>
                    <th>username</th>
                    <th>email</th>
                    <th>Position</th>
                    <th>GitHub</th>
                    <th></th>
                    <tbody>
                        {developers.map((obj)=>{
                            return(
                                <tr>
                                    <td>{obj.userName}</td>
                                    <td>{obj.email}</td>
                                    <td>{obj.position}</td>
                                    <td>{obj.gitHubAccount}</td>
                                    <td><Form.Check onCheck value={obj.userName}></Form.Check></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Col>
                    <Button style={{float:"right"}}>Add to team</Button>
                </Col>
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