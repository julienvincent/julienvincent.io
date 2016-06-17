import { Component, createElement } from 'react'
import { render } from 'react-dom'
import App from './containers/App'
if (process.env.NODE_ENV !== 'production') {
    require('./index.scss')
}

import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

window.onload = () => render(createElement(App), document.getElementById('root'))