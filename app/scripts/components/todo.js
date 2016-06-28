import React from 'react';

class TodoBox extends React.Component {

  getInitialState () {
    return {
      todos: []
    }
  }

  componentDidMount () {

  }

  loadTodo () {
    this.setState({todos: [{name: 'Do!', done: false, timestamp: 'timestamp'}]})
  }

  render () {
    return (
      <div className="todoBox">
        <h1>Todo</h1>
        <TodoList todos={this.state.todos} />
      </div>
    )
  }

}
