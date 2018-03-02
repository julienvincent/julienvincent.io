import registerServiceWorker from "./registerServiceWorker"
import Root from "./containers/Root"
import ReactDOM from "react-dom"
import React from "react"

ReactDOM.render(<Root />, document.getElementById("root"))
registerServiceWorker()
