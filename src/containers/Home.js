// @flow
import React, {Component} from "react"
import styled from "styled-components"
import {media} from "../utils"

import Circles from "./Circles"

type Props = {}

type State = {
  cursor: boolean,
  username: string
}

class Home extends Component<Props, State> {
  state = {
    cursor: true,
    username: ""
  }

  interval = null

  componentDidMount() {
    this.interval = setInterval(this.blink, 600)
    setTimeout(this.writeUsername, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  writeUsername = () => {
    const word = "@julienvincent"

    let interval = null
    const write_letter = () => {
      const {username} = this.state
      if (word.length === username.length) {
        return clearInterval(interval)
      }
      this.setState({
        username: word.substring(0, username.length + 1)
      })
    }

    interval = setInterval(write_letter, 25)
  }

  blink = () => {
    const {cursor} = this.state
    this.setState({
      cursor: !cursor
    })
  }

  render() {
    const {username, cursor} = this.state

    return (
      <Container>
        <Circles/>

        <Content>
          <Title>
            Julien <span>Vincent</span>
          </Title>

          <Footer>
            <Username>
              {username}{" "}
              <span style={{color: cursor ? "transparent" : "inherit"}}>_</span>
            </Username>

            <Links>
              {/* eslint-disable */}
              <a
                className="icon-github"
                href="https://github.com/julienvincent"
                target="_blank"
                rel="noopener noreferrer"
              />
              <a
                className="icon-twitter"
                href="https://twitter.com/julienvincent_"
                target="_blank"
                rel="noopener noreferrer"
              />
              <a
                className="icon-mail"
                href="mailto:julienlucvincent@gmail.com"
              />
              {/* eslint-enable */}
            </Links>
          </Footer>
        </Content>
      </Container>
    )
  }
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #eeeeee;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5em;
  margin-bottom: 10em;
`

const Title = styled.p`
  font-size: 600%;
  font-weight: 100;

  span {
    font-weight: 300;
  }

  ${media.phone`
      font-size: 400%;
  `};
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 10;

  ${media.phone`
    flex-direction: column;
  `};
`

const Username = styled.p`
  align-self: flex-start;
  font-size: 150%;
  color: #2980b9;
`

const Links = styled.div`
  height: 100%;

  a {
    font-size: 130%;
    margin-left: 15px;
    color: #bdc3c7;
    transition: 0.1s ease-out;
    text-decoration: none;

    &:hover {
      color: #3498db;
    }

    ${media.phone`
      margin: 0 15px 0 0;
    `};
  }

  ${media.phone`
    margin-top: 15px;
  `};
`

export default Home
