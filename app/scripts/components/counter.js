import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 0
    }
  }

  handleNewSeconds() {
    this.setState((previousState) => {
      return {seconds: previousState.seconds + 2}
    })
  }

  componentDidMount() {
    setInterval(() => {
      this.handleNewSeconds()
    }, 1000)
  }

  render() {
    return (
      <h3>{this.state.seconds}</h3>
    )
  }
}
