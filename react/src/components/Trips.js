import React, { Component }  from 'react';
import NewTrip from './NewTrip';

class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      tripsData: [],
      currentTripId: null,
      tripName: "",
      userNewId: parseInt(document.getElementById('ident').dataset.id),
      page: true,
    };
    this.getData = this.getData.bind(this);
    this.handleDeleteTrip = this.handleDeleteTrip.bind(this);
    this.handleSelectTrip = this.handleSelectTrip.bind(this);
    this.handleNewTrip = this.handleNewTrip.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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
          trips: body[0]['trips'],
          currentTripId: body[0]['currentTripId']
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
        tripsData: response
      }));
  }


  render() {

    let show = null;
    if (this.state.page) {
      show = <NewTrip
              trips={this.state.trips}
              handleDeleteTrip={this.handleDeleteTrip}
              handleSelectTrip={this.handleSelectTrip}
              handleNewTrip={this.handleNewTrip}
              tripsData={this.state.tripsData}
              currentTripId={this.state.currentTripId}
              tripName={this.state.tripName}
              userNewId={this.state.userNewId}
              activityId={this.state.activityId}
            />
    }


    return(
      <div>
        <h5 onClick={this.handleBoolean}>Select Trip</h5>
        {show}
      </div>
    )
  }
}

export default Trips;
