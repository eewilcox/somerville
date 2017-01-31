import React, { Component }  from 'react';
import Trip from './Trip';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
    };
    this.getData = this.getData.bind(this);
    this.handleDeleteTrip = this.handleDeleteTrip.bind(this);
  }

  getData() {
    fetch('http://localhost:3000/api/v1/trips.json')
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
        this.setState({trips: body});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getData();
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

  render() {
    let trips = this.state.trips.map((trip) => {
      let handleDeleteTrip = () => {
        this.handleDeleteTrip(trip.id);
      };
      return (
        <Trip
          id={trip.id}
          key={trip.id}
          name={trip.trip_name}
          handleDeleteTrip={handleDeleteTrip}
        />
      )
    });
    return(
      <div>
        {trips}
      </div>
    )
  }
}

export default App;
