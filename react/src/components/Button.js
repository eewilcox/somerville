import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      activityId: null,
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();
    let id = parseInt(document.getElementById('button').dataset.id);
    this.setState({ activityId: id});
  }
  
  render() {
    return(
      <div onClick={this.handleAdd}>
        <h1>Add to Trip</h1>
      </div>
    );
  }
}

export default Button;
