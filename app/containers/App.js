import { Component } from 'react'
import { div, p, text, Motion, spring } from '../components'
import _ from 'lodash'

export default
class App extends Component {
    constructor() {
        super()

        this.state = {
            cursor: true,
            username: "",
            circles: []
        }
    }

    componentWillMount() {
        this.blink()
        setTimeout(this.writeUsername, 3000)
    }

    writeUsername = () => {
        const word = "@julienvincent"
        const {username} = this.state
        if (word.length != username.length) {
            this.setState({
                username: word.substring(0, username.length + 1)
            }, () => {
                setTimeout(this.writeUsername, 25)
            })
        }
    }

    blink = () => {
        const {cursor} = this.state
        this.setState({
            cursor: !cursor
        }, () => {
            setTimeout(this.blink, 600)
        })
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
        const {cursor, username, circles} = this.state

        return (
            div({className: 'app', onClick: this.createCircle},
                div({className: 'center'},
                    p({className: 'name'}, "Julien ", text({}, "Vincent")),
                    p({className: 'username'}, username, " ", text({style: {color: `${cursor ? 'transparent' : 'inherit'}`}}, "_"))
                ),

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
}