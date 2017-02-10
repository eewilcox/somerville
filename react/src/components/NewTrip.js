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
        <form action="zones#index" id="new-trip" className="small-11 small-centered columns">
          <input id="trip-name" type="text" name="tripName" placeholder="Create a New Trip" onChange={this.props.handleNameChange}/>
          <input onClick={this.props.handleNewTrip} type="submit"/>
        </form>
      </div>
    );
  }
}

export default NewTrip;
