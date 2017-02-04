import React, { Component }  from 'react';
import NewTrip from './NewTrip';
import Trip from './Trip';

class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      currentTripId: null,
      userNewId: parseInt(document.getElementById('ident').dataset.id),
      page: false,
    };
    this.getData = this.getData.bind(this);
    this.handleDeleteTrip = this.handleDeleteTrip.bind(this);
    this.handleSelectTrip = this.handleSelectTrip.bind(this);
    this.handleNewTrip = this.handleNewTrip.bind(this);
    this.handleBoolean = this.handleBoolean.bind(this);
  }

  getData() {
    fetch('/api/v1/trips.json', {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} ($response.statusText)`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          trips: body[0].trips,
          currentTripId: body[0].currentTripId
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getData();
  }

  handleBoolean(event) {
    event.preventDefault();
    if (this.state.page) {
      this.setState({ page: false});
    } else {
      this.setState({ page: true});
    }
  }

  handleNewTrip(event) {
    event.preventDefault();
    let data = document.getElementById("trip-name").value;
    let id = this.state.userNewId;
    let activeTrip = this.state.currentTripId;
    let newData = {
      "trip": {
        "trip_name": data,
        "user_id": id,
        "activeTrip": activeTrip
      }
    };

    let newTrips = [];
    fetch(`/api/v1/trips/`,
      { method: "POST",
      body: JSON.stringify(newData) })
      .then(function(response) {
        newTrips = response.json();
        return newTrips;
      }).then((response) => this.getData());
    }

  handleDeleteTrip(tripId){
    let fetchBody = { id: tripId };
    let tripArray = [];
    fetch(`/api/v1/trips/${tripId}`,
    { method: "DELETE",
    body: JSON.stringify(fetchBody)
  }).then(function(response) {
      tripArray = response.json();
      return tripArray;
  }).then((response) => this.getData());
  }

  handleSelectTrip(tripId) {
    fetch(`/api/v1/trips/${tripId}`, {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(body => {
        let data = body;
        this.setState({currentTripId: tripId});
      });
  }

  render() {
    let show;
    let poop;
    poop =
      <NewTrip
        trips={this.state.trips}
        handleDeleteTrip={this.handleDeleteTrip}
        handleSelectTrip={this.handleSelectTrip}
        handleNewTrip={this.handleNewTrip}
        currentTripId={this.state.currentTripId}
        userNewId={this.state.userNewId}
      />

    let trips;
    if (this.state.trips) {
      trips = this.state.trips.map(trip => {
        let handleDeleteTrip = () => {
          this.handleDeleteTrip(trip.id);
        };

        let handleSelectTrip = () => {
          this.handleSelectTrip(trip.id);
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
      })
    }

    let show = poop;
      if (this.state.page) {
        show = <NewTrip />
      } else {
        show = trips
      }


    return(
      <div id="tres-buttons" className="small-8 small-centered columns">
        <button className="react-button" onClick={this.handleBoolean}>Create New Trip</button>
        <button className="react-button" onClick={this.handleBoolean}>Work on Different Trip</button>
        <a className="react-button" href="zones#index">Back to neighborhoods</a>
        {show}
      </div>
    )
  }
}

export default Trips;
