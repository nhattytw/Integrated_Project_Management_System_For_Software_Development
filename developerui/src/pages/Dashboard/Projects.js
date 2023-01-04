import {
  Container,
  Col,
  Row,
  Button,
  ButtonGroup,
  Table,
  ProgressBar,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Activeprojects } from "../../API/Activeprojects";
import "rsuite/dist/rsuite.min.css";
import { Nav, Content } from "rsuite";
import AdvancedAnalyticsIcon from "@rsuite/icons/AdvancedAnalytics";
import PlusIcon from "@rsuite/icons/Plus";
import BarChartIcon from "@rsuite/icons/BarChart";
import ListIcon from "@rsuite/icons/List";
import TimeIcon from "@rsuite/icons/Time";
import ContenetDisplay from "../../Components/ConentDisplay/ConentDisplay";
import { useState, useContext } from "react";
import Example from "../../Components/charts/PieChart";
import { Context, ContextProvider } from "../../Context/context";
// project manager is not required to enter the wbs,schedule and status upon creation.
//wbs will come from later modules and the schedule will be dervied from the wbs

const ProjectNav = () => {
  const { Tabs, setTabs } = useContext(Context);
  return (
    <Container>
      <Row>
        <Col>
          <Nav appearance="tabs">
            <Nav.Item
              icon={<AdvancedAnalyticsIcon />}
              onSelect={() => {
                setTabs("ActiveProjects");
              }}
            >
              Active Projects
            </Nav.Item>
            <Nav.Item
              icon={<BarChartIcon />}
              onSelect={() => {
                setTabs("ProjectStatus");
              }}
            >
              Project Status
            </Nav.Item>
            <Nav.Item
              icon={<TimeIcon />}
              onSelect={() => {
                setTabs("Schedule");
              }}
            >
              Schedule{" "}
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

const ActiveProjects = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <h3>Budget</h3>
            <Example></Example>
          </Row>
        </Col>

        <Col>
          <h3>Project Details</h3>
          <ul>
            <li>
              <h6>project name:Bantu</h6>
            </li>
            <li>
              <h6>status:active</h6>
            </li>
            <li>
              <h6>Repo:github repo link</h6>
            </li>
          </ul>
        </Col>
        <Col>
          <h3>Team memebers:</h3>
          <ul>
            <li>
              <h6>abc</h6>
            </li>
            <li>
              <h6>def</h6>
            </li>
            <li>
              <h6>ghi</h6>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
const ProjectStatus = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>project Name</th>
          <th>Start date</th>
          <th>Completion date</th>
          <th>Progress</th>
          <th>note</th>
        </tr>
      </thead>
      <tr>
        <td>1</td>
        <td>bantu</td>
        <td>12/12/12</td>
        <td>12/1/14</td>
        <td>
          <div style={{ padding: "3px 0px 0px 0px" }}>
            <ProgressBar now={60} variant="success" label={60}></ProgressBar>
          </div>
        </td>

        <td>on schedule</td>
      </tr>
    </Table>
  );
};
const CreateWbs = () => {
  return <h1>Wbs</h1>;
};
const Schedule = () => {
  return <h1>schedule</h1>;
};
const pages = {
  ActiveProjects: ActiveProjects,
  ProjectStatus: ProjectStatus,
  Schedule: Schedule,
};
const Projects = () => {
  const { Tabs, setTabs } = useContext(Context);

  return (
    <>
      <ProjectNav />
      <ContenetDisplay content={pages[Tabs]}></ContenetDisplay>
    </>
  );
};
export default Projects;
