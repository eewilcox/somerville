import React, { Component }  from 'react';
import Trip from './Trip';
import NewTrip from './NewTrip';

class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      currentTripId: null,
      userNewId: parseInt(document.getElementById('ident').dataset.id),
      page: false,
      page2: false,
      alert: "",
    };
    this.getData = this.getData.bind(this);
    this.handleDeleteTrip = this.handleDeleteTrip.bind(this);
    this.handleSelectTrip = this.handleSelectTrip.bind(this);
    this.handleNewTrip = this.handleNewTrip.bind(this);
    this.handleBoolean = this.handleBoolean.bind(this);
    this.handleBoolean2 = this.handleBoolean2.bind(this);
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
      this.setState({
        page: false,
        alert: ""
      });
    } else {
      this.setState({
        page: true,
        alert: ""
      });
    }
  }

  handleBoolean2(event) {
    event.preventDefault();
    if (this.state.page2) {
      this.setState({
        page2: false,
        alert: ""
      });
    } else {
      this.setState({
        page2: true,
        alert: ""
      });
    }
  }

  handleNewTrip(event) {
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
      }).then((response) =>
        this.setState({
          alert: "Created!"})
      );
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
  }).then((response) =>
      this.getData()
    ).then((p) =>
      this.setState({
      alert: "Being deleted..."
    })
  );
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
        this.setState({
          currentTripId: tripId,
          alert: "Trip Selected!"
        });
      });
  }

  render() {
    let trips;
    if (this.state.page2) {
      trips = this.state.trips.map((trip) => {
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
        });
    }

    let show;
    if (this.state.page) {
      show = <NewTrip
        trips={this.state.trips}
        handleDeleteTrip={this.handleDeleteTrip}
        handleSelectTrip={this.handleSelectTrip}
        handleNewTrip={this.handleNewTrip}
        currentTripId={this.state.currentTripId}
        userNewId={this.state.userNewId}
      />
    }

    return(
      <div id="tres-buttons" className="small-8 small-centered columns">
        <h4>{this.state.alert}</h4>
        <button className="react-button" onClick={this.handleBoolean}>Create New Trip</button>
        <button className="react-button" onClick={this.handleBoolean2}>Manage Trips</button>
        <a className="react-button" href="zones#index">Back to neighborhoods</a>
        {show}
        {trips}
      </div>
    )
  }
}

export default Trips;
