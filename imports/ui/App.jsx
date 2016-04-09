import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom'
import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.newtask).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.newtask).value = '';
  }
  renderTasks(){
    return this.props.tasks.map((task)=>(
      <Task key={task._id} task={task}/>
    ))
  }
  render(){
    return <div>
      <header>
        <h1>Todo List</h1>
          <form onSubmit= {this.handleSubmit.bind(this)}>
            <input type='text' ref='newtask' placeholder='Add your new Task'/>
          </form>
      </header>
      <ul>
        {this.renderTasks()}
      </ul>
    </div>
}
}
App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
