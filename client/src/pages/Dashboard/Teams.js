import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Dropdown from 'react-bootstrap/Dropdown';
import { Nav } from 'rsuite'
import PeoplesMapIcon from '@rsuite/icons/PeoplesMap';
// import CheckIcon from '@rsuite/icons/Check';
// import CloseIcon from '@rsuite/icons/Close';
import { PostTeams, teams } from '../../API/Teams';
import socketIOClient from "socket.io-client";

const endPoint ="http://127.0.0.1:3001"
const TeamNav = () => {
    return (
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
const CreateTeams = () => {
    const [developers, setDevelopers] = useState([])
    const [members, setMembers] = useState([])
    const [show, setShow] = useState(false);
    const [Team, setTeam] = useState([])
    let temp = [];
    
    // const socket = socketIOClient(endPoint)
    
    const url = 'http://localhost:9000/api/Teams/getDeveloper'
    useEffect(() => {
        axios.get(
            url,
            {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('Bearer')
                },
            }
        ).then((response) => {
            setDevelopers(response.data)

        })


    }, [])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNameInput = (event) => {
        
    }
    const ListTeams=(props)=>{
        const [select,setSelect] = useState(false)
        let result =[]
        
        const addMemeber=(e)=>{
            setMembers([...members,e.target.value])
            console.log(members)
        }

        return(
            <Container>
                <Row style={{width:"50vh"}}>
                    <Col>
                    <p>{props.username}</p>
                    </Col>
                    <Col>
                    <p>{props.Position}</p>
                    </Col>
                    <Col>
                        <input type='checkbox' value={props.username} onChange={(e)=>{addMemeber(e)
                        
                        }}></input>
                    </Col>
                </Row>
                
            </Container>
        )
    }
    const handleSubmit = () => {
        const TeamName = document.getElementById('teamName')
 
        const data={
            members:Team,
            teamName:TeamName.value
        }
        
         PostTeams(data)
        console.log(data)
        // socket.emit("TeamCreation")

        handleClose()
    }
    const CreateTeam = (props) => {
        return (

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Team Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control type='text' placeholder='Enter team name' id='teamName' autoComplete='false'></Form.Control>
                        <Button style={{ margin: '4px 0px 0px 0px' }} onClick={()=>{handleSubmit()}}>Save</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        )
    }

    const handleCheck = (event) => {
        var updatedList = [...Team];
        if (event.target.checked) {
          updatedList = [...Team, event.target.value];
        } else {
          updatedList.splice(Team.indexOf(event.target.value), 1);
        }
        setTeam(updatedList);
        console.log(Team)
      };
    const onCreateTeam = () => {
        handleShow()
    }
    return (
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
           
              
                        {developers.map((obj) => {
                            return (
                                <div>
                                    <input type="checkbox" value={obj.userName} onChange={handleCheck}></input>
                                    <span>
                                    {obj.userName}
                                    <span> </span>
                                    {obj.position}
                                    </span>
                                    
                                    
                                
                                </div>
                            )
                        })}

                {/* {developers.map((obj)=>{
                    return(
                        <ListTeams username={obj.userName} Position={obj.position}></ListTeams>
                    )
                })} */}
                
                
                    <Button style={{ float: "right" }} onClick={handleShow}>Create Team</Button>
               
          
            <CreateTeam />
        </Container>
    )
}
const Teams = () => {
    return (
        <>
            <TeamNav />

            <CreateTeams />

        </>
    )

}

export default Teams