import React, { Component } from 'react';

class CurrentTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div style={{display: 'inline-block'}}>
      - {this.props.name} -
      </div>
    );
  }
}

export default CurrentTrip;
