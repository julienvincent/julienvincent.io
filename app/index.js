import { createElement } from 'react'
import { render } from 'react-dom'
import App from './containers/App'

if (process.env.NODE_ENV !== 'production') require('./index.scss')

window.onload = () => render(createElement(App), document.getElementById('root'))