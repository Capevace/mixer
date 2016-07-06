import React from 'react'


class MuteButton extends React.Component {
  constructor (props) {
    super(props)
    console.log(props);
    this.state = {
      muted: props.initialMuteState
    }
  }

  handleClick () {
    var muted = !this.state.muted
    this.setState({
      muted: muted
    })

    this.props.onChange(muted)
  }

  render () {
    return (
      <div className="row">
        <div className="col-sm-6">
          <button className={'btn btn-sm mute-button ' + (this.state.muted ? 'btn-danger' : '')} onClick={this.handleClick.bind(this)}>M</button>
        </div>
      </div>
    )
  }
}

export default MuteButton
