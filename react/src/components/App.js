import React, { Component }  from 'react';
import Trip from './Trip';
import Button from './Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      tripsData: [],
      currentTripId: null,
      tripName: "",
      userNewId: null,
      activityId: null,
      page: true,
    };
    this.getData = this.getData.bind(this);
    this.handleDeleteTrip = this.handleDeleteTrip.bind(this);
    this.handleSelectTrip = this.handleSelectTrip.bind(this);
    this.handleNewTrip = this.handleNewTrip.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleBoolean = this.handleBoolean.bind(this);
    this.handleSelectActivity = this.handleSelectActivity.bind(this);
  }

  getData() {
    fetch('/api/v1/trips.json')
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
          trips: body,
          userNewId: body[0]["user_id"]
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
    let newData = {
      "trip": {
        "trip_name": data,
        "user_id": id
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
    fetch(`/api/v1/trips`)
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

  handleSelectActivity(event) {
    event.preventDefault();
    let id = parseInt(document.getElementById('button').dataset.id);
    this.setState({ activityId: id});
  }

  handleAdd(event) {
    event.preventDefault();
    let fetchBody = { activity_id: this.state.activityId,
                      trip_id: this.state.currentTripId
                    };
    let newFolders = [];
    fetch(`/api/v1/trips/${this.state.currentTripId}`,
      { method: "PATCH",
      body: JSON.stringify(fetchBody) })
      .then(function(response) {
        newFolders = response.json();
        return newFolders;
      }).then((response) => this.setState({
        tripData: response
      }));
  }

  render() {

    let trips = this.state.trips.map((trip) => {
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

    let show = null;
    if (this.state.page) {
      show = <Button
              handleSelectActivity={this.handleSelectActivity}
              handleAdd={this.handleAdd}
            />
    } else {
      show = trips
    }

    return(
      <div>
        <h1 onClick={this.handleBoolean}>Help</h1>
        <form>
          <input id="trip-name" type="text" placeholder="New Trip"></input>
          <input onClick={this.handleNewTrip} type="submit"></input>
        </form>
        {show}
      </div>
    )
  }
}

export default App;
