import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import { Footer } from '../../Components/footer/Footer'
import image from './google.svg';
import people from './github.svg';
import calander from './realtime.svg';
import team from './people.png';
import constraintChart from './constraintChart.png'
import laptop from './laptop.png'

const Landing = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [])

  const handleSubmit = () => {
    const state = localStorage.getItem('Bearer')

    if (state === null) {
      window.open('/login', '_self')
    } else {
      window.open('/Dashboard', '_self')
    }

  }
  return (

    <div className='font-link'>

      <Container fluid className='LandingImage intro' style={{ height: "100vh" }}>
        <div className="header">
          <Row >
            <Col className='c1'>
              <h4 className='intro-h4' style={{padding: "10px"}} >
                Now you can manage your projects, teams and constraints
                with ease and efficency to accomplish the best work.
              </h4>
            </Col>
          </Row>
          <Row>
            <Row>
              <Button
                className="font-link btn-landing"
                style={{height: "60px" , width:"180px"}}
                variant='primary'
                onClick={handleSubmit}
              >
                Get Started
              </Button>

            </Row>
          </Row>
        </div>
      </Container>
      <Container className='container' style={{ height: "100vh"}}>
        <Container style={{margin: "200px 0px 0px 0px" }}>

        </Container>
        <Row style={{margin:"0px 0px 40px 0px",textAlign:'center'}}>
        <h3>Procratio is a web-based, list-making, scheduling and project managing application</h3>
        <p></p>

        </Row>
        <Row className='flexlist' style={{ margin: "0px 0px 0px" }}>
          <Col data-aos="fade-right" data-aos-duration="2000" className="flexitem">
            <Card className="cardH">
              <Card.Img variant="top" src={image} className="img-height icon" />
              <Card.Body>
                <Card.Text>
                  <p>
                    Zoom API has several features that can help anyone use it to their advantage. It is the mark of an excellent programmer to know how to use this API effectively. This blog post looks at how to use the API and, hopefully, offers a few ideas about using it to your advantage.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col data-aos="fade-right" data-aos-duration="3000">
            <Card className="cardH" >
              <Card.Img variant="top" src={people} className="img-height icon" />
              <Card.Body>
                <Card.Text>
                  <p>
                    GitHub, like many online repo services, supports Markdown for issue tracking, user comments, wikis. everything. With so many other programming languages to learn for setting up projects, it’s really a big benefit to have your content input in a format without having to learn yet another system. In addition, there is also what is known as the GitHub flavored markdown. a feature that adds changes to the usual markdown in order to make it more useful for documentation.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col data-aos="fade-right" data-aos-duration="2200">
            <Card className="cardH">
              <Card.Img variant="top" src={calander} className="img-height icon" />

              <Card.Body>
                <Card.Text>
                  <p>
                    A real-time application, or RTA, is an application that functions within a time frame that the user senses as immediate or current. The latency must be less than a defined value, usually measured in seconds. The use of real-time applications is part of real-time computing.

                    To determine if a specific application qualifies as real time is a function of its worst-case execution time. WCET is the maximum amount of time a defined task or set of tasks requires on a given hardware platform.


                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>


      </Container>

      <Container data-aos="fade-right">
        <Row>
          <Col>

          </Col>
        </Row>
        <Row>
          <Col style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h2 >Our features</h2>

          </Col>

          <hr className='line' />

        </Row>
        <Row className='heightmanip' style={{ margin: "100px 0px", height: "50vh" }}>
          <Col >
            <img src={team} alt="Team" />
          </Col>
          <Col className='Description'>
            <h4>manage your teams and oversee operations </h4>
            <p>Trying to go it alone rather than utilizing all the talents of a group of people rarely results in growth. That&#39;s why effective team management is so important.
              Team management usually involves a manager, a team, communication skills, active listeners, objective setting, creating a positive culture, and oftentimes a project management software to help everyone stay efficient and organized.
            </p>
          </Col>
        </Row>

      </Container>
      <Container data-aos="fade-left">
        <Row>

          <Col className='Description'>
            <h4>oversee constraints at play in your project </h4>
            <p>Project constraints are the general limitations that you need to account for during the project life cycle. For example, a cost constraint means that you’re limited to a specific project budget, while a time constraint means you must complete your project within a specified timeframe.

              Most project constraints impact one another, which is why constraint management is crucial for project success. If you decide that you must expand the project timeline, then you’ll likely need more money to complete the project as well. Your project scope will also expand when the time and cost of your project expand.


            </p>
          </Col>
          <Col >
            <img src={constraintChart} alt="Constraint Chart" style={{ paddingLeft: "200px", marginTop: "-5px" }} />
          </Col>
        </Row>
      </Container>
      <Container data-aos="fade-right">
        <Row >
          <Col >
            <img src={laptop} alt="Laptop" />
          </Col>
          <Col className='Description'>
            <h4>manage your project and oversee operations </h4>
            <p>
              Quickly and easily understand what is going on in and around your business at any given moment.
              Put more information directly at your fingertips through the use of smart dashboards, real-time notifications.
            </p>
          </Col>
        </Row>

      </Container>
      <Footer />
    </div>

  )
}
export default Landing;