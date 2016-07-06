import React from 'react'

/*
 *
 * 	Fader COMPONENT
 *
 */
class Fader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.initialValue || 0,
      realValue: props.initialValue || 0
    }
  }

  handleChange (event) {
    var realValue = event.target.value

    this.setState({value: event.target.value, realValue: realValue})

    this.props.onChange(realValue)
  }

  readableValue () {
    var value = this.state.realValue

    if (value <= -60) {
      return '-∞ db'
    }

    return (value === 0 ? '' : (value > 0 ? '+' : '')) + this.state.realValue + ' db'
  }

  render () {
    return (
      <div>
        <p className="volume-label">
          Value: {this.readableValue()}
        </p>
        <input
          className="music-slider"
          type="range"
          min={-60}
          max={20.0}
          step={0.1}
          orient="vertical"
          //style={this.constructor.styles.input}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          />
      </div>
    )
  }
}

// Fader.styles = {
//   input: {
//     width: '300px',
//     height: '20px',
//     display: 'block',
//     position: 'relative',
//     marginLeft: '50%',
//     left: '-150px',
//     marginTop: '50%',
//     top: '110px',
//     transform: 'rotateZ(-90deg)',
//     writingMode: 'bt-lr',
//     background: 'transparent'
//   }
// }

export default Fader
