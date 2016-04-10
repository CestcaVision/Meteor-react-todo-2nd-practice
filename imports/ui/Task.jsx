import React, { Component, PropTypes } from 'react';
export default class Task extends Component {

  render(){
    return
    <li>
      <span>{this.props.task.text}</span>
    </li>
  }
}
