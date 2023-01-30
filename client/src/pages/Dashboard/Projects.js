import { Container, Col, Row, Button, ButtonGroup, Table, ProgressBar, Card } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { Modal } from 'react-bootstrap';
import { Activeproject, postProject } from '../../API/Project'
import "rsuite/dist/rsuite.min.css";
import { Nav } from 'rsuite'
import { addWbs } from '../../API/wbs';
import AdvancedAnalyticsIcon from '@rsuite/icons/AdvancedAnalytics';
import PlusIcon from '@rsuite/icons/Plus';
import BarChartIcon from '@rsuite/icons/BarChart';
import ListIcon from '@rsuite/icons/List';
import TimeIcon from '@rsuite/icons/Time';
import ContenetDisplay from '../../Components/ConentDisplay/ConentDisplay';
import { useState, useContext, useEffect } from 'react';
import Example from '../../Components/charts/PieChart'
import axios from 'axios';
import { Context, ContextProvider } from '../../Context/context';
import { MyBoard } from '../../Components/Khanban Board/KhanBan';



// project manager is not required to enter the wbs,schedule and status upon creation.
//wbs will come from later modules and the schedule will be dervied from the wbs




const ProjectNav = () => {
    const { Tabs, setTabs } = useContext(Context)
    return (
        <Container>
            <Row>
                <Col>
                    <Nav appearance='tabs' >
                        <Nav.Item icon={<PlusIcon />} onSelect={() => { setTabs("CreateProject") }}>Create Project</Nav.Item>
                        <Nav.Item icon={<AdvancedAnalyticsIcon />} onSelect={() => { setTabs("ActiveProjects") }}>Active Projects</Nav.Item>
                        <Nav.Item icon={<ListIcon />} onSelect={() => { setTabs("CreateWbs") }}>Create WBS</Nav.Item>

                    </Nav>
                </Col>
            </Row>
        </Container>

    )
}

const CreateProject = () => {
    const [formData, setFormData] = useState(
        {
            projectname: '',
            projectRepository: '',
            budget: '',
            duration: '',
            descripion: '',
            userName: localStorage.getItem('userName')
        })
    const handleChange = (event) => {
        let newData = Object.assign(formData, { [event.target.name]: event.target.value })

        setFormData(newData)

    }

    return (
        <Container>
            <Form>
                <Row>
                    <Col>
                        <h5 style={{ margin: "0px 10px 6px 0px" }}>Create Project</h5>

                        <Form.Group>
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" name="projectname" onChange={handleChange} />
                            <Form.Label>Budget</Form.Label>
                            <Form.Control type="number" name="budget" onChange={handleChange} />
                            <Form.Label>Duration(months)</Form.Label>
                            <Form.Control type="number" name='duration' onChange={handleChange} />

                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>GitHub Repository</Form.Label>
                        <Form.Control type='text' name="projectRepository" onChange={handleChange} />
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control as="textarea" name="descripion" onChange={handleChange} />
                    </Col>
                    <Row>
                        <Col>
                            <div style={{ margin: "10px 0px 0px 0px", justifyContent: "end" }}>
                                <Button variant="primary" onClick={() => postProject(formData)}>Submit</Button>
                                <Button variant="dark">Clear</Button>

                            </div>


                        </Col>

                    </Row>


                </Row>
            </Form>

        </Container>
    )
}
const SummaryPage = () => {
    const { Detail, setDetail } = useContext(Context)
    const Project_Details = [Detail]
    const { wbs } = Detail;
    const Tasks = wbs.task
    console.log(Tasks)

    return (
        <>
            <Container>
                <h1>Project Summary</h1>

                {Project_Details.map((detail) => {
                    return (

                        <Row>
                            <Col>
                                <Card style={{ width: "62vh", height: "30vh" }}>
                                    <Row>
                                        <Col>
                                            <div style={{ margin: '0px 0px 0px 20px' }}>
                                                <h3>Budget</h3>
                                                <Example />
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div style={{ padding: '0px 10px 0px 0px' }}>
                                                <h3 style={{ margin: '0px 0px 10px 0px' }}>Project Detail</h3>
                                                <p>Project Name:{detail.projectName}</p>
                                                <p>Starting Date:{detail.status}</p>
                                                <p>Project Repository Name:{detail.projectRepository}</p>
                                                <p>Duration:{detail.duration}</p>
                                                <p>Created At:{detail.createdAt}</p>
                                                <p>Description:{detail.descripion}</p>
                                                <p>progress</p>
                                                <ProgressBar variant="success" now={60} label={60}></ProgressBar>

                                            </div>

                                        </Col>

                                    </Row>



                                </Card>
                            </Col>


                            <Col>
                                <Card className='schedule'>
                                    <Table borderless>
                                        <tr>

                                            <th>task</th>
                                            <th>Starting Date</th>
                                            <th>Ending Date</th>

                                        </tr>
                                        {Tasks.map((task) => {
                                            return (
                                                <tr>
                                                    <td>{task.title}</td>
                                                    <td>{task.StartingDate}</td>
                                                    <td>{task.EndingDate}</td>

                                                </tr>

                                            )
                                        })}
                                    </Table>

                                </Card>

                            </Col>

                        </Row>

                    )
                })}
                <Row>
                    <Col>
                        <h3>Tasks</h3>
                        <Container className='customBoard' xs={2}>
                            <h5>To-Do</h5>
                            {Tasks.map((task) => {
                                return (
                                    <Card className='customBoardItem'>
                                        <h6>{task.title}</h6>
                                        <ul>
                                            {task.tasks.map((t) => {
                                                return (
                                                    <li>{t}</li>
                                                )
                                            })}
                                        </ul>
                                    </Card>

                                )
                            })}
                        </Container>
                        <Container className='doneBoard'>
                            <h5>Done</h5>
                            <Card className="doneBoardItem">
                                <h4>task title</h4>
                                <ul>
                                    <li>task1</li>
                                    <li>task2</li>
                                    <li>task3</li>
                                </ul>
                            </Card>
                        </Container>
                    </Col>

                </Row>

            </Container>
        </>

    )
}
const ActiveProjects = () => {
    const { Tabs, setTabs } = useContext(Context)
    const [Openprojects, setOpenProjects] = useState([])
    const { Detail, setDetail } = useContext(Context)
    const url = 'http://localhost:9000/api/project/ActiveProject'

    useEffect(() => {
        axios.get(url).then((response) => {
            setOpenProjects(response.data)
        })


    }, [])
    const testClick = () => {
        setTabs("SummaryPage")
    }
    return (
        <Container>
            {/* {console.log(Openprojects)} */}


            <Table borderless size='sm'>
                <tr>
                    <th>Project Name</th>
                </tr>
                <tbody>

                    {Openprojects.map((project) => {
                        return (
                            <tr>
                                <td>{project.projectName}</td>
                                <td><Button variant="dark" onClick={() => {
                                    setDetail(project)
                                    testClick()
                                }}
                                >See Details</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>





        </Container>

    )
}

const TaskModal = (props) => {
    const [task, setTask] = useState([{ task: '' }])
    const handleChange = (index, event) => {
        let data = [...task]
        data[index][event.target.name] = event.target.value
        setTask(data)
    }
    const addFields = () => {
        let newField = { task: '' }
        setTask([...task, newField])
    }
    const Submit = (props) => {

        let newData = Object.assign(props.wbs, { 'tasks': task })
        props.Addwbs(newData)
        props.onHide(false)

    }
    const removeFields = (index) => {
        if (task.length === 1) {
            setTask([{ task: '' }])
        }
        else {
            let data = [...task]
            data.splice(index, 1)
            setTask(data)

        }

    }
    return (
        <Modal
            {...props}
            size="lg"
        >

            <Modal.Header closeButton >
                <Modal.Title>
                    Add subtasks
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form>
                            {task.map((input, index) => {
                                return (

                                    <Row key={index} style={{ margin: "5px 0px 0px 0px" }}>
                                        <Col xs={6}>
                                            <Form.Control type='text' name='task'
                                                value={input.task}
                                                autoComplete="off"
                                                onChange={event => handleChange(index, event)}


                                            >

                                            </Form.Control>

                                        </Col>
                                        <Col xs lg="2">
                                            <ButtonGroup>
                                                <Button onClick={addFields} style={{ margin: "0px 5px 0px 0px" }}>Add subtask</Button>
                                                <Button onClick={() => removeFields(index)} variant="danger" >Remove subtask</Button>


                                            </ButtonGroup>

                                        </Col>

                                    </Row>

                                )
                            })}
                        </Form>

                    </Col>
                    <Button onClick={() => { Submit(props) }}
                        style={{ margin: '30px 0px 0px 0px' }}
                    >
                        Create Subtasks
                    </Button>
                </Row>
            </Modal.Body>
        </Modal>
    )

}

const CreateWbs = () => {
    const [show, setShow] = useState(false)
    const [wbs, setWbs] = useState({})
    const [task, setTask] = useState([])
    const [projects, setProjects] = useState([])
    const [Data, setData] = useState([])
    const [Default, setDefault] = useState("")

    const url = 'http://localhost:9000/api/project/wbsNotSet'
    useEffect(() => {
        axios.get(url).then((response) => {
            setProjects(response.data)


        })


    }, [])
    const createWbs = (event) => {
        let newData = Object.assign(wbs, { [event.target.name]: event.target.value })
        setWbs(newData)
    }
    const submitWbs = () => {
        const { projectName } = wbs

        addWbs(Data, projectName)
    }
    const addWbsEntry = () => {
        const { title, tasks, StartingDate, EndingDate } = wbs

        const temp_data = {}
        const temp_tasks = []
        let newData = []
        tasks.map((t) => {
            temp_tasks.push(t["task"])
        })
        temp_data["tasks"] = temp_tasks
        temp_data["StartingDate"] = StartingDate
        temp_data["EndingDate"] = EndingDate
        temp_data["title"] = title
        setData([...Data, temp_data])
        setDefault("")



    }


    return (
        <div>
            <h1>Work Break Down Structure</h1>
            <Container>
                <Col sm={6}>
                    <Form.Label>Select Project</Form.Label>
                    <Form.Select name="projectName" onChange={(e) => { createWbs(e) }}>
                        <option></option>
                        {projects.map((data) => {
                            return (
                                <option >{data.projectName}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
                <Col sm={6}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' name="title" onChange={(e) => { createWbs(e) }}></Form.Control>
                    <Button style={{ marginTop: "10px" }} onClick={() => { setShow(true) }}>Add sub tasks</Button>
                    <TaskModal
                        show={show}
                        onHide={() => { setShow(false) }}
                        Addwbs={setWbs}
                        wbs={wbs}
                    >

                    </TaskModal>
                    <br />
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type='date' name="StartingDate" onChange={(e) => { createWbs(e) }}></Form.Control>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type='date' name="EndingDate" onChange={(e) => { createWbs(e) }}></Form.Control>
                    <div style={{ marginTop: "10px" }}>
                        <Button onClick={() => { addWbsEntry() }}>Add</Button>
                        <Button onClick={() => { submitWbs() }}>Submit</Button>
                    </div>

                </Col>
            </Container>
        </div>
    )
}

const pages = {
    "CreateProject": CreateProject,
    "ActiveProjects": ActiveProjects,
    "CreateWbs": CreateWbs,
    "SummaryPage": SummaryPage



}
const Projects = () => {
    const { Tabs, setTabs } = useContext(Context)

    return (
        <>

            <ProjectNav />
            <ContenetDisplay content={pages[Tabs]}>
            </ContenetDisplay>


        </>

    )
}
export default Projects;    