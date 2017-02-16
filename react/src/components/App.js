import React, { Component }  from 'react';
import Button from './Button';
import CurrentTrip from './CurrentTrip';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTripId: null,
      tripName: "",
      alert: "",
      message: "",
      userNewId: parseInt(document.getElementById('ident').dataset.id),
      activityId: parseInt(document.getElementById('button').dataset.id),
    };
    this.getData = this.getData.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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
          currentTripId: body[0].currentTripId,
          message: body[0].message[0],
          tripName: body[0].tripName
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getData();
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
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          this.setState({ alert: "Activity already added!"});
        }
      })
      .then(function(response) {
        newFolders = response.json();
        return newFolders;
      }).then((response) => this.getData());
  }


  render() {
    let currentTrips;
    if (this.state.message) {
      currentTrips = this.state.message.map((message) => {
          return (
            <CurrentTrip
              id={message.id}
              key={message.id}
              name={message.name}
            />
          )
        });
    }

    let button;
    if (this.state.currentTripId) {
      button = <Button
        handleAdd={this.handleAdd}
        alert={this.state.alert}
      />
    } else {
      button = <a href="/trips" id="first-time" className="react-button">Create Trip</a>
    }
    return(
      <div>
        <h6 id="row2" className="small-12 medium-3 small-centered columns">
          {this.state.tripName}
        </h6>
        <h6 id="row" className="small-12 small-centered columns">
          {currentTrips}
        </h6>
        <div id="main-button">
          {button}
        </div>
      </div>
    )
  }
}

export default App;
