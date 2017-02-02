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
        <button id="add-activity" onClick={this.props.handleAdd}>Add to Trip</button>
      </div>
    );
  }
}

export default Button;
