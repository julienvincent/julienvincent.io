// @flow
import styled from "styled-components"
import React from "react"

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 10px;
  margin-bottom: 5px;

  i {
    margin-right: 10px;
    margin-top: 6px;
    font-size: 10px;
    opacity: 0.8;
  }
`

const Bullet = ({children}) => {
  return (
    <Container>
      <i className="icon-dot" />
      <p>{children}</p>
    </Container>
  )
}

export default Bullet
