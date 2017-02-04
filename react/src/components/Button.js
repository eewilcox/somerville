import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div>
        <p>{this.props.alert}</p>
        <button className="react-button" onClick={this.props.handleAdd}>Add to Trip</button>
      </div>
    );
  }
}

export default Button;
