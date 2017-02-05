import React, { Component } from 'react';

class CurrentTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div style={{display: 'inline-block'}}><a href={`/activities/${this.props.id}`}>
      - {this.props.name} -
      </a></div>
    );
  }
}

export default CurrentTrip;
