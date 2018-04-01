// @flow
import styled from "styled-components"
import React from "react"

const Container = styled.div`
  display: flex;
  min-height: 50px;
`

const Margin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px;

  i {
    color: #2980b9;
    margin-bottom: 6px;
  }
`

const Border = styled.div`
  width: 3px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0;
`

type Props = {
  children: any
}

const Timeline = ({children}: Props) => {
  return (
    <Container>
      <Margin height="20px">
        <i className="icon-circle" />
        <Border />
      </Margin>

      <Content>{children}</Content>
    </Container>
  )
}

export default Timeline
