import React, { Component } from 'react';


class NewTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <div>
        <form id="new-trip" className="small-11 small-centered columns">
          <input id="trip-name" type="text" placeholder="Create a New Trip"></input>
          <input onClick={this.props.handleNewTrip} type="submit"></input>
        </form>
      </div>
    );
  }
}

export default NewTrip;
