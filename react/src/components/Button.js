import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
  }

  render() {
    return(
      <div onClick={this.props.handleAdd}>
        <h1>Add to Trip</h1>
      </div>
    );
  }
}

export default Button;
