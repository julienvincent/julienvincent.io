// @flow
import {Timeline, Bullet, Link} from "../components"
import {Link as RLink} from "react-router-dom"
import React, {Component} from "react"
import styled from "styled-components"
import {media} from "../utils"

class CV extends Component<{}> {
  render() {
    return (
      <Container>
        <Content>
          <h1>Hi</h1>

          <p>
            My name is Julien Vincent. I am a full stack software
            engineer/architect with a primary focus on backend systems and
            systems design
          </p>

          <h1>Work Experience</h1>

          <Timeline>
            <p style={{marginBottom: 10}}>
              <b>Jan 2017 - Present</b>
            </p>

            <p>
              Contracting for{" "}
              <Link href="http://www.inradagroup.com">Inrada Group</Link> where
              I am acting as Software Architect on a data-mining project
            </p>

            <h4>Achievements</h4>

            <Bullet>
              Built systems for consuming, storing and querying very large
              quantities of data
            </Bullet>
            <Bullet>
              Built a web-app to show analytical data (using d3) to system
              admins and clients
            </Bullet>
            <Bullet>
              Setup and maintain Kubernetes based infrastructure with automated
              deployments
            </Bullet>
            <Bullet>
              Wrote a TCP based protocol for performing light-weight, encrypted
              communication between micro processors
            </Bullet>
          </Timeline>

          <Timeline>
            <p style={{marginBottom: 10}}>
              <b>Nov 2016 - Nov 2017</b>
            </p>

            <p>
              Worked at <Link href="https://onedayonly.co.za">OneDayOnly</Link>{" "}
              as a Software Engineer where I later transitioned primarily to
              DevOps
            </p>

            <h4>Achievements</h4>

            <Bullet>
              Designed and built a system to control all processes at the
              OneDayOnly warehouses
            </Bullet>
            <Bullet>
              Built a tablet app using React Native for use by warehouses
              workers in managing stock
            </Bullet>
            <Bullet>
              Setup and managed infrastructure on Google Cloud using Docker and
              Kubernetes
            </Bullet>
            <Bullet>
              Setup a CI/CD process and workflow for automated testing and
              deployments
            </Bullet>
          </Timeline>

          <h1>Languages</h1>

          <h4>Machine</h4>

          <Bullet>JavaScript (FlowType, Nodejs)</Bullet>
          <Bullet>Clojure/Script</Bullet>
          <Bullet>Java</Bullet>
          <Bullet>PHP</Bullet>

          <h4>Human</h4>

          <Bullet>English</Bullet>
          <Bullet>French</Bullet>
          <Bullet>Afrikaans</Bullet>

          <h1>Skills</h1>

          <Bullet>Docker</Bullet>
          <Bullet>Kubernetes/DevOps</Bullet>
          <Bullet>React and React Native</Bullet>
          <Bullet>GraphQL</Bullet>
          <Bullet>SQL</Bullet>
          <Bullet>Datomic</Bullet>
          <Bullet>Networking</Bullet>

          <h1>Contact Me</h1>

          <a href="mailto:julienlucvincent@gmail.com">Email</a>
          <RLink to="/">Website</RLink>
        </Content>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  min-height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 1200px;

  p {
    opacity: 0.7;
  }

  a {
    text-decoration: none;
  }

  ${media.phone`
    width: 90%;
  `};
`

export default CV
