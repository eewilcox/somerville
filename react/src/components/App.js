import React, { Component }  from 'react';
import Button from './Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTripId: null,
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
          message: body[0].message
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
      .then(function(response) {
        newFolders = response.json();
        return newFolders;
      }).then((response) => this.setState({
        alert: 'Activity Added to Trip!'
      }));
  }


  render() {
    return(
      <div>
        <Button
          handleAdd={this.handleAdd}
          alert={this.state.alert}
        />
      </div>
    )
  }
}

export default App;
