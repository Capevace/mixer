import React from 'react';
import Counter from './counter';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        'Browserify',
        'Babel',
        'Bootstrap',
        'Modernizr',
        'Jest'
      ]
    };
  }

  render() {
    return (
      <div className="hero-unit">
        <h1>'Allo, 'Allo!</h1>
        <p>This is a React component.<br/>
           You now also have:</p>
        <ul>{this.state.items.map(this.renderHeadingItem)}</ul>
        <h2>Second counter</h2>
        <Counter />
      </div>
    );
  }

  renderItem(item, index) {
    return <li key={index}>{item}</li>;
  }

  renderHeadingItem(item, index) {
    return <li key={index}><b>{item}</b></li>;
  }
}
