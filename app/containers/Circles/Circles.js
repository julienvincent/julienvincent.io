import { Component, createFactory } from 'react'
import { _, div, Motion, spring } from '../../components'

export default
createFactory(class Circles extends Component {

    constructor() {
        super()

        this.state = {
            circles: []
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.createCircle)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.createCircle)
    }

    createCircle = ({clientX, clientY}) => {
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
            circles: [...this.state.circles, {
                x: clientX,
                y: clientY,
                id: Math.random(),
                background: _.sample(colors),
                size: _.random(50, 420)
            }]
        })
    }

    removeCircle = _id => {
        this.setState({
            circles: _.filter(this.state.circles, ({id}) => id != _id)
        })
    }

    render() {
        const {circles} = this.state

        return (
            div({},
                _.map(circles, ({id, x, y, background, size}) => (
                        Motion({
                                defaultStyle: {dimensions: 0},
                                style: {dimensions: spring(size, {stiffness: 120})},
                                onRest: () => this.removeCircle(id),
                                key: id
                            },
                            ({dimensions}) => (
                                div({
                                    className: 'circle',
                                    style: {
                                        width: dimensions,
                                        height: dimensions,
                                        left: x - (dimensions / 2),
                                        top: y - (dimensions / 2),
                                        opacity: 1 - (dimensions / size),
                                        background
                                    }
                                })
                            )
                        )
                    )
                )
            )
        )
    }
})