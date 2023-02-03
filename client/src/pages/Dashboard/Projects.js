import { Alert, Container, Col, Row, Button, ButtonGroup, Table, ProgressBar, Card } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { Modal } from 'react-bootstrap';
// import { Activeproject, postProject } from '../../API/Project'
import "rsuite/dist/rsuite.min.css";
import { Nav } from 'rsuite'
import { addWbs } from '../../API/wbs';
import PlusIcon from '@rsuite/icons/Plus';
import BarChartIcon from '@rsuite/icons/BarChart';
import TimeIcon from '@rsuite/icons/Time';
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import PauseRoundIcon from '@rsuite/icons/PauseRound';
import ContenetDisplay from '../../Components/ConentDisplay/ConentDisplay';
import { useState, useContext, useEffect } from 'react';
import Example from '../../Components/charts/PieChart'
import axios from 'axios';
import { Context } from '../../Context/context';
// import socketIOClient from "socket.io-client";


const base_url = 'http://localhost:9000/api'
const endPoint = "http://127.0.0.1:3001"

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
                        <Nav.Item icon={<BarChartIcon />} onSelect={() => { setTabs("CreateWbs") }}>Create WBS</Nav.Item>
                        <Nav.Item icon={<TimeIcon />} onSelect={() => { setTabs("ActiveProjects") }}>Active Projects</Nav.Item>
                        <Nav.Item icon={<CheckRoundIcon />} onSelect={() => { setTabs("CompletedProjects") }}>Completed Projects</Nav.Item>
                        <Nav.Item icon={<PauseRoundIcon />} onSelect={() => { setTabs("InactiveProjects") }}>Inactive Projects</Nav.Item>

                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

const CreateProject = () => {
    const [formData, setFormData] = useState({
        projectName: "",
        projectRepository: "",
        budget: "",
        duration: "",
        descripion: "",
        userName: localStorage.getItem('userName')
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            // ...formData,
            [name]: value,
        })
    }
    
    const handleSubmit = async (event) => {
        
        let temp = Object.assign(formData,{userName: localStorage.getItem('userName')})
        setFormData({
            temp
            
        })
      

        try {
            var formBody = JSON.stringify(formData)

            const response = await fetch(
                base_url + `/project/createProject`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': localStorage.getItem('Bearer')
                    },
                    body: formBody
                },
            )
            const data = await response.json()
          
            if (data.message === "Project Created Successfully.") {
                handleCancel()
                setMessage("Project Created Successfully!")
                setVariant("success")
                setShow(true)

            } else {
                setMessage(data.message)
                setVariant("danger")
                setShow(true)
                handleCancel()
            }

            setTimeout(() => {
                setShow(false)
            }, "3000")
        }
        catch (error) {
            setMessage(error.message)
            setVariant("danger")
            setShow(true)
        }
    }

    const handleCancel = () => {
        setFormData({
            ...formData,
            projectName: "",
            projectRepository: "",
            budget: "",
            duration: "",
            descripion: "",
            userName: localStorage.getItem('userName')
        })
    }
    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()
    return (
        <div>
            <Alert show={show} variant={variant}>
                <p style={{ textAlign: 'center' }}>
                    {message}
                </p>
            </Alert>

            <Container>
                <Form>
                    <Row>
                        <h4 style={{ margin: "0px 10px 6px 0px" }}>Create Project</h4>
                        <Col>
                            <Form.Group>
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="projectName"
                                    onChange={handleChange}
                                    value={formData.projectName}
                                />
                                <Form.Label>Budget</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="budget"
                                    onChange={(e)=>{handleChange(e)}}
                                    value={formData.budget}
                                />
                                <Form.Label>Duration(months)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='duration'
                                    onChange={(e)=>{handleChange(e)}}
                                    value={formData.duration}
                                />

                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>GitHub Repository</Form.Label>
                            <Form.Control
                                type='text'
                                name="projectRepository"
                                onChange={(e)=>{handleChange(e)}}
                                value={formData.projectRepository}
                            />
                            <Form.Label>Project Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="descripion"
                                onChange={(e)=>{handleChange(e)}}
                                value={formData.descripion}
                            />
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <div style={{ margin: "10px 0px 0px 0px", justifyContent: "end" }}>
                                <Button
                                    variant="primary"
                                    onClick={()=>{handleSubmit()}}
                                >
                                    Submit
                                </Button>
                                <Button
                                    variant="dark"
                                    onClick={()=>{handleCancel()}}
                                >
                                    Clear
                                </Button>
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>

                </Form>
            </Container>
        </div>
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
                <h3>Project Summary</h3>

                {Project_Details.map((detail) => {
                    return (

                        <Row>
                            <Col>
                                <Card style={{ width: "62vh", height: "30vh" }}>
                                    <Row>
                                        <Col>
                                            <div style={{ margin: '0px 0px 0px 20px' }}>
                                                <h4>Budget</h4>
                                                <Example />
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div style={{ padding: '0px 10px 0px 0px' }}>
                                                <h4 style={{ margin: '0px 0px 10px 0px' }}>Project Detail</h4>
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

                                            <th>Task</th>
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
                        <h4>Tasks</h4>
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
                            {console.log(Tasks)}
                            <h5>Done</h5>
                            {Tasks.map((task) => {
                                return (
                                    <Card className="doneBoardItem">
                                        <h6>{task.title}</h6>
                                        <ul>
                                            {task.completedTasks.map((ct) => {
                                                return (

                                                    <li>{ct}</li>
                                                )
                                            })}
                                        </ul>
                                    </Card>

                                )
                            })}
                        </Container>
                    </Col>

                </Row>

            </Container>
        </>

    )
}

const ActiveProjects = () => {
    const { Tabs, setTabs } = useContext(Context)
    const { Detail, setDetail } = useContext(Context)

    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const [state, setState] = useState({
        temp: "",
        teamName: "",
        result: [],
        userName: localStorage.getItem('userName')
    })

    const handleRelease = async (teamName) => {

        state.teamName = teamName

        var formBody = JSON.stringify(state)
        console.log(formBody)

        try {
            const response = await fetch(
                base_url + `/Teams/unassignTeam`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': localStorage.getItem('Bearer')
                    },
                    body: formBody
                },
            )
            const data = await response.json()

            if (data.message === "Team Unassigned") {
                setMessage("Team Unassigned!")
                setVariant("success")
                setShow(true)
                handleLoad()
            } else {
                setMessage(data.message)
                setVariant("danger")
                setShow(true)
            }

            setTimeout(() => {
                setShow(false)
            }, "3000")
        }
        catch (error) {
            setMessage(error.message)
            setVariant("danger")
            setShow(true)
        }

    }

    const handleLoad = () => {
        const url = 'http://localhost:9000/api/project/ActiveProject'

        axios.get(url).then((response) => {
            var assignedResult = []

            response.data.forEach(element => {
                assignedResult.push({
                    'teamName': element.isAssignedTo[0],
                    'projectName': element.projectName,
                    'wbs': element.wbs
                })
            })
            state.result = assignedResult

            setState({
                ...state,
                temp: "",
            })
        }).catch(() => {
            setMessage("Fetching Failed")
            setVariant("danger")
            setShow(true)
        })

        setTimeout(() => {
            setShow(false)
        }, "3000")
    }

    useEffect(() => {
        handleLoad()
    }, [])

    const testClick = () => {
        setTabs("SummaryPage")
    }

    return (
        <div>
            <Alert show={show} variant={variant}>
                <p style={{ textAlign: 'center' }}>
                    {message}
                </p>
            </Alert>
            <Container>
                <Row>
                    <Col style={{ margin: "0px 0px 0px 18px" }}>
                        <h4>Active Projects</h4>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project Name</th>
                                    <th>Assigned Team</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody >
                                {state.result?.map((projects, index) => (
                                    <tr data-index={index}>
                                        <td>{index + 1}</td>
                                        <td>{projects.projectName}</td>
                                        <td>{projects.teamName}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    setDetail(projects)
                                                    testClick()
                                                }}
                                            >
                                                Details
                                            </Button>

                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    handleRelease(projects.teamName)
                                                }}
                                            >
                                                Release Team
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

const InactiveProjects = () => {
    const { Tabs, setTabs } = useContext(Context)

    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const [state, setState] = useState({
        projectName: "",
        result: [],
        userName: localStorage.getItem('userName')
    })

    useEffect(() => {
        const handleLoad = async () => {
            try {
                const projectResponse = await fetch(
                    base_url + `/project/getProject`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': localStorage.getItem('Bearer')
                        },
                    },
                )
                const projectData = await projectResponse.json()

                if (projectData.message === "Project Information") {
                    var projectResult = []

                    projectData.data.forEach(element => {
                        projectResult.push(element)
                    })

                    state.result = projectResult

                    setState({
                        ...state,
                        projectName: "",
                    })
                } else {
                    console.log(projectData.message)
                    setMessage(projectData.message)
                    setVariant("danger")
                    setShow(true)
                }

                setTimeout(() => {
                    setShow(false)
                }, "3000")
            } catch (error) {
                if (error.message === `Unexpected token 'A', "Access Denied" is not valid JSON`) {
                    let msgg = `Access Denied`
                    setMessage(msgg)
                    setVariant("danger")
                    setShow(true)
                }
                else {
                    setMessage(error.message)
                    setVariant("danger")
                    setShow(true)
                }
            }
        }

        handleLoad()
    }, [])

    return (
        <div>
            <Alert show={show} variant={variant}>
                <p style={{ textAlign: 'center' }}>
                    {message}
                </p>
            </Alert>
            <Container>
                <Row>
                    <Col style={{ margin: "0px 0px 0px 18px" }}>
                        <h4>Inactive Projects</h4>

                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project Name</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody >
                                {state.result?.map((projects, index) => (
                                    <tr data-index={index}>
                                        <td>{index + 1}</td>
                                        <td>{projects}</td>
                                        {/* <td>
                                            <Button
                                                variant="primary"
                                            >
                                                Assign Team
                                            </Button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>


                </Row>
            </Container>
        </div >
    )
}

const CompletedProjects = () => {
    const { Tabs, setTabs } = useContext(Context)

    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const [state, setState] = useState({
        projectName: "",
        result: [],
        userName: localStorage.getItem('userName')
    })

    useEffect(() => {
        const handleLoad = async () => {
            try {
                const projectResponse = await fetch(
                    base_url + `/project/getProject`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': localStorage.getItem('Bearer')
                        },
                    },
                )
                const projectData = await projectResponse.json()

                if (projectData.message === "Project Information") {
                    var projectResult = []

                    projectData.data.forEach(element => {
                        projectResult.push(element)
                    })

                    state.result = projectResult

                    setState({
                        ...state,
                        projectName: "",
                    })
                } else {
                    console.log(projectData.message)
                    setMessage(projectData.message)
                    setVariant("danger")
                    setShow(true)
                }

                setTimeout(() => {
                    setShow(false)
                }, "3000")
            } catch (error) {
                if (error.message === `Unexpected token 'A', "Access Denied" is not valid JSON`) {
                    let msgg = `Access Denied`
                    setMessage(msgg)
                    setVariant("danger")
                    setShow(true)
                }
                else {
                    setMessage(error.message)
                    setVariant("danger")
                    setShow(true)
                }
            }
        }

        handleLoad()
    }, [])

    return (
        <div>
            <Alert show={show} variant={variant}>
                <p style={{ textAlign: 'center' }}>
                    {message}
                </p>
            </Alert>
            <Container>
                <Row>
                    <Col style={{ margin: "0px 0px 0px 18px" }}>
                        <h4>Completed Projects</h4>

                        <h1>Not done yet</h1>

                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project Name</th>
                                    <th>Team Name</th>
                                    <th>Completion Date</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody >
                                {state.result?.map((projects, index) => (
                                    <tr data-index={index}>
                                        <td>{index + 1}</td>
                                        <td>{projects}</td>
                                        <td>{projects}</td>
                                        <td>{projects}</td>
                                        {/* <td>
                                            <Button
                                                variant="primary"
                                            >
                                                Assign Team
                                            </Button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div >
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
            <Container>
                <h4 style={{ margin: "0px 10px 6px 0px" }}>Work Breakdown Structure</h4>
                <Row>
                    <Col sm={6}>
                        <Form.Label>Select Project</Form.Label>
                        <Form.Select name="projectName" onChange={(e) => { createWbs(e) }}>
                            {projects.map((data) => {
                                return (
                                    <option >{data.projectName}</option>
                                )
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Label>Task title</Form.Label>
                        <Form.Control type='text' name="title" onChange={(e) => { createWbs(e) }}></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Button
                            style={{ marginTop: "10px" }}
                            onClick={() => { setShow(true) }}>
                            Add sub tasks
                        </Button>
                        <TaskModal
                            show={show}
                            onHide={() => { setShow(false) }}
                            Addwbs={setWbs}
                            wbs={wbs}
                        >
                        </TaskModal>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <br />
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type='date'
                            name="StartingDate"
                            onChange={(e) => { createWbs(e) }}></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type='date'
                            name="EndingDate"
                            onChange={(e) => { createWbs(e) }}>
                        </Form.Control>
                    </Col>
                </Row>
                <Row>

                    <div style={{ marginTop: "10px" }}>
                        <Button onClick={() => { addWbsEntry() }}>Add</Button>
                        <Button onClick={() => { submitWbs() }}>Submit</Button>
                    </div>
                </Row>
            </Container>
        </div >
    )
}

const pages = {
    "CreateProject": CreateProject,
    "ActiveProjects": ActiveProjects,
    "CreateWbs": CreateWbs,
    "SummaryPage": SummaryPage,
    "InactiveProjects": InactiveProjects,
    "CompletedProjects": CompletedProjects

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