import { AssignmentContext, Context } from "../../../Context/context";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Table,
  Accordion,
  Tab,
  FormText,

} from "react-bootstrap";
import { CheckTreePicker, Toggle } from "rsuite";
import { Nav } from "rsuite";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import PauseRoundIcon from "@rsuite/icons/PauseRound";
import PeoplesIcon from "@rsuite/icons/Peoples";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import ContenetDisplay from "../../../Components/ConentDisplay/ConentDisplay";
import { postCompletedTask } from "../../../API/Assignments";



const AssignemtsNav = () => {
  const { Assignment, setAssignment } = useContext(Context);
  return (
    <Container>
      <Row>
        <Col>
          <Nav appearance="tabs">
            <Nav.Item
              icon={<PauseRoundIcon />}
              onSelect={() => {
                setAssignment("PendingAssignments");
              }}
            >
              Assignments
            </Nav.Item>
            {/* <Nav.Item
              icon={<CheckRoundIcon />}
              onSelect={() => {
                setAssignment("CompletedAssgnement");
              }}
            >
              Completed Assignments
            </Nav.Item> */}
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

const PendingAssignments = () => {
  const [activeAssignments, setAssignment] = useState([]);
  const [projects, setProjects] = useState([])
  const [doneAssignements, setDoneAssignments] = useState({})
  const [tasks, setTasks] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [selectedProject, setSelectedProject] = useState("")
  const [title, setTitle] = useState("")
  const base_url = "http://localhost:9000/api/";
  const props = {
    disabled: disabled
  }

  useEffect(() => {
    axios({
      method: 'post',
      url: base_url.concat('project/myprojects'),
      data: {
        username: localStorage.getItem('userName')

      }

    }).then((response) => {
      console.log(response)
      setProjects(response.data)
    })

  }, []);
  const getProjects = (e) => {
    axios.post(base_url + "project/findProject",
      { "project": e.target.value }
    ).then((response) => {
      if (response.status === 200) {
        setAssignment(response.data[0].wbs.task)
        setSelectedProject(e.target.value)

      }
    }).catch((error) => {
      console.log(error)
    })
  }
  function removeDuplicates(arr) {
    return arr.filter((item,
      index) => arr.indexOf(item) === index);
  }
  const handleCheck = (e, title) => {
    if (e.target.checked) {
      let Arr = [...tasks, e.target.value]
      setTasks(Arr)
      let temp = {}
      temp[title] = Arr
      console.log(temp)
      setDoneAssignments(temp)
    } else {
      let RemoveUncheckedtasks = tasks.filter(x => x !== e.target.value)

      setTasks(RemoveUncheckedtasks)
      let temp = {}
      temp[title] = RemoveUncheckedtasks
      setDoneAssignments(temp)
      console.log(temp)

    }




    // setTitle(title)


  }
  const postComplete = () => {

    let NewObject = {}
    let newArr = []
    for (const task in doneAssignements) {

      newArr = removeDuplicates(doneAssignements[task])
      NewObject[task] = newArr
    }
    console.log("new", NewObject)
    const taskDetail = {
      ProjectName: selectedProject,

      finishedTask: NewObject
    }


    const base_path = 'http://localhost:9000/api/';

    axios({
      method: 'post',
      url: base_path.concat('task/postCompletedTasks'),
      data: taskDetail
    }).then((response) => {

      setAssignment(response.data.task)
    });
  }

  return (
    <Container>
      <Row>
        <Col xs={5}>
          <Form.Label>select project</Form.Label>
          <Form.Select title="Select project" onChange={(e) => { getProjects(e) }} >
            <option></option>
            {projects.map((project) => {
              return (
                <option>{project.projectName}</option>
              )
            })}

          </Form.Select >


        </Col>
      </Row>
      <Row>
        <Col>
          {activeAssignments.map((active) => {
            return (
              <Accordion style={{ margin: '10px 0px 0px 0px' }}>
                <Accordion.Header>{active.title}</Accordion.Header>
                <Accordion.Body>
                  {active.tasks.map((t) => {
                    return (
                      <>
                        <Row>
                          <Col>
                            <p>{t}</p>
                          </Col>
                          <Col>
                            <input type="checkbox" value={t} onChange={(e) => handleCheck(e, active.title)} />
                          </Col>
                        </Row>

                      </>

                    )
                  })}
                  <Button variant="success" style={{ float: 'right', margin: '5px 0px 5px 0px' }} onClick={() => { postComplete() }}>Completed</Button>
                </Accordion.Body>
              </Accordion>
            )
          })}

        </Col>
      </Row>
    </Container>
  );
};
const CompletedAssignments = () => {
  const [completedTask, setCompletedTask] = useState([])
  const base_url = "http://localhost:9000/api/";
  useEffect(() => {
    axios({
      method: 'post',
      url: base_url.concat('project/myprojects'),
      data: {
        username: localStorage.getItem('userName')

      }

    }).then((response) => {
      console.log(response)
      // setCompletedTask(response.data[0].wbs)
    })
  }, [])
  return (
    <Container>
      <Row>
        <Col>
          <h4>Completed task</h4>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Assigned Team</th>
                <th>Date Assigend</th>
                <th>Date Completed</th>

              </tr>
              <tr>
                {completedTask.map((task) => {

                  <td></td>
                })}
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
const pages = {
  PendingAssignments: PendingAssignments,
  CompletedAssgnement: CompletedAssignments,
};

const Assignments = () => {
  const { Assignment, setAssignment } = useContext(Context);
  return (
    <>
      <AssignemtsNav />
      <ContenetDisplay content={pages[Assignment]}></ContenetDisplay>
    </>
  );
};

export default Assignments;
