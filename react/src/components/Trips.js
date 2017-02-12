import React, { Component }  from 'react';
import Trip from './Trip';
import NewTrip from './NewTrip';

class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      tripName: "",
      currentTripId: null,
      userNewId: parseInt(document.getElementById('ident').dataset.id),
      page: false,
      page2: false,
      alert: "",
    };
    this.getData = this.getData.bind(this);
    this.handleSelectTrip = this.handleSelectTrip.bind(this);
    this.handleNewTrip = this.handleNewTrip.bind(this);
    this.handleBoolean = this.handleBoolean.bind(this);
    this.handleBoolean2 = this.handleBoolean2.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
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

  handleNameChange(event) {
    let name = event.target.value;
    this.setState({ tripName: name });
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
    this.getData();
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
    event.preventDefault();
    let data = this.state.tripName;
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
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          this.setState({ alert: `You already have a trip named "${this.state.tripName}"`});
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          alert: "Created!",
          currentTripId: body.id
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
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
          tripName: data.trip_name,
        });
      }).then(p  => {
        this.setState({alert: `${this.state.tripName} Selected!`});
      });
  }

  render() {
    let trips;
    if (this.state.page2) {
      trips = this.state.trips.map((trip) => {

        let handleSelectTrip = () => {
          this.handleSelectTrip(trip.id);
        };

          return (
            <Trip
              id={trip.id}
              key={trip.id}
              name={trip.trip_name}
              handleSelectTrip={handleSelectTrip}
            />
          )
        });
    }

    let show;
    if (this.state.page) {
      show =
      <NewTrip
        trips={this.state.trips}
        handleSelectTrip={this.handleSelectTrip}
        handleNewTrip={this.handleNewTrip}
        currentTripId={this.state.currentTripId}
        userNewId={this.state.userNewId}
        tripName={this.state.tripName}
        handleNameChange={this.handleNameChange}
      />
    }

    return(
      <div className="small-6 small-centered columns">
        <h4 id="react-alert">
          {this.state.alert}
        </h4>
        <div id="neighborhoods" className="row">
          <a href="zones#index">
            Back to Neighborhoods
          </a>
        </div>
        <div id="tres-buttons">
          <button className="react-button" onClick={this.handleBoolean}>
            Create New Trip
          </button>
          <button className="react-button" onClick={this.handleBoolean2}>
            Select Trip to Work On
          </button>
          {show}
          {trips}
        </div>
      </div>
    )
  }
}

export default Trips;
