// @flow
import {Motion, spring} from "react-motion"
import styled from "styled-components"
import React, {Component} from "react"
import _ from "lodash"

type Props = {}

type State = {
  circles: Array<Object>
}

class Circles extends Component<Props, State> {
  state = {
    circles: []
  }

  componentDidMount() {
    window.addEventListener("click", this.createCircle)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.createCircle)
  }

  createCircle = ({clientX, clientY}: Object) => {
    const colors = [
      "#2980b9",
      "#34495e",
      "#e74c3c",
      "#27ae60",
      "#16a085",
      "#d35400",
      "#7f8c8d",
      "#8e44ad"
    ]

    this.setState({
      circles: [
        ...this.state.circles,
        {
          x: clientX,
          y: clientY,
          id: Math.random(),
          background: _.sample(colors),
          size: _.random(50, 420)
        }
      ]
    })
  }

  removeCircle = (_id: number) => {
    this.setState({
      circles: _.filter(this.state.circles, ({id}) => id !== _id)
    })
  }

  render() {
    const {circles} = this.state

    return (
      <div>
        {_.map(circles, ({id, x, y, background, size}) => {
          return (
            <Motion
              defaultStyle={{dimensions: 0}}
              style={{dimensions: spring(size, {stiffness: 120})}}
              onRest={() => this.removeCircle(id)}
              key={id}>
              {({dimensions}) => {
                return (
                  <Circle
                    style={{
                      width: dimensions,
                      height: dimensions,
                      left: x - dimensions / 2,
                      top: y - dimensions / 2,
                      opacity: 1 - dimensions / size,
                      background
                    }}
                  />
                )
              }}
            </Motion>
          )
        })}
      </div>
    )
  }
}

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
`

export default Circles
