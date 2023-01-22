import { Container, Row, Col, Form, Table, Card, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Nav } from 'rsuite'
import PeoplesMapIcon from '@rsuite/icons/PeoplesMap';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import { PostTeams } from '../../API/Teams';

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
    const [Team, setTeam] = useState({})

    const url = 'http://localhost:9000/api/Teams/getDeveloper'
    useEffect(() => {
        axios.get(url).then((response) => {
            setDevelopers(response.data)

        })


    }, [])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNameInput = (event) => {

    }
    const handleSubmit = () => {
        const TeamName = document.getElementById('teamName')
        const data = Object.assign(
            { members: members },
            { [TeamName.id]: TeamName.value }
            )
        PostTeams(data)
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
                        <Button style={{ margin: '4px 0px 0px 0px' }} onClick={handleSubmit}>Save</Button>
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
    const onBtnClicked = (username) => {
        const newMemembers = [...members, username]
        setMembers(newMemembers)

    }
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
            <Row style={{ margin: "20px 0px 0px 0px" }}>
                <Table>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>GitHub</th>
                    <th></th>
                    <tbody>
                        {developers.map((obj) => {
                            return (
                                <tr>
                                    <td>{obj.userName}</td>
                                    <td>{obj.email}</td>
                                    <td>{obj.position}</td>
                                    <td>{obj.gitHubAccount}</td>
                                    <td><Button onClick={() => { onBtnClicked(obj.userName) }} >Select</Button></td>
                                    <td><Button >Remove</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>

                </Table>
                <Col>
                    <Button style={{ float: "right" }} onClick={handleShow}>Create Team</Button>
                </Col>
            </Row>
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