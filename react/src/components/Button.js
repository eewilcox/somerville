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
      <div>
        <button onClick={this.props.handleAdd}>Add</button>
      </div>
    );
  }
}

export default Button;
