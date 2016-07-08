import React from 'react'
import Mixer from './mixer/mixer'
import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Mixer />
    )
  }
}
