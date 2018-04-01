// @flow
import {HashRouter, Route} from "react-router-dom"
import React, {Component} from "react"
import Home from "./Home"
import CV from "./CV"

class Root extends Component<{}> {
  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/cv" exact component={CV} />
        </div>
      </HashRouter>
    )
  }
}

export default Root
