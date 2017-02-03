import React, { Component } from 'react';
import Trip from './Trip';

class NewTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let trips = this.props.trips.map((trip) => {
      let handleDeleteTrip = () => {
        this.props.handleDeleteTrip(trip.id);
      };

      let handleSelectTrip = () => {
        this.props.handleSelectTrip(trip.id);
      };

        return (
          <Trip
            id={trip.id}
            key={trip.id}
            name={trip.trip_name}
            handleDeleteTrip={handleDeleteTrip}
            handleSelectTrip={handleSelectTrip}
          />
        )
      });

    return(
      <div>
        <form>
          <input id="trip-name" type="text" placeholder="New Trip"></input>
          <input onClick={this.props.handleNewTrip} type="submit"></input>
        </form>
        {trips}
      </div>
    );
  }
}

export default NewTrip;
