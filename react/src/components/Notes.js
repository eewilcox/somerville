import React, { Component }  from 'react';
import Note from './Note';

class Notes extends Component {
  constructor(props) {
    super(props);
    // let hyperlink = location.href.split('/');
    // let noteId = hyperlink[hyperlink.length - 1];
    this.state = {
      noteId: null,
      userId: parseInt(document.getElementById('ident').dataset.id),
      activityId: parseInt(document.getElementById('button').dataset.id),
      noteBody: "",
      page: false,
    };
    this.getNote = this.getNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.getBody = this.getBody.bind(this);
    this.showHide = this.showHide.bind(this);
  }

  getBody(event) {
    let name = event.target.value;
    this.setState({ noteBody: name });
  }

  getNote() {
    fetch(`/api/v1/activities/${this.state.activityId}/notes.json`, {
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
          noteBody: body.note_body,
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getNote();
  }

  showHide(event) {
    this.getNote();
    event.preventDefault();
    if (this.state.page) {
      this.setState({
        page: false,
      });
    } else {
      this.setState({
        page: true,
      });
    }
  }

  addNote(event) {
    event.preventDefault();
    let newData = {
      "note": {
        "activity_id": this.state.activityId,
        "user_id": this.state.userId,
        "body": this.state.noteBody
      }
    };

    fetch(`/api/v1/activities/${this.state.activityId}/notes`,
      { method: "POST",
      body: JSON.stringify(newData) })
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          noteId: body.id,
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }



  render() {
    let show;
    if (this.state.page) {
      show =
      <Note
        id={this.state.noteId}
        key={this.state.noteId}
        body={this.state.noteBody}
        getBody={this.getBody}
        addNote={this.addNote}
      />
    }


    return(
      <div>
        <button className="react-button" onClick={this.showHide}>
          Add Note
        </button>
        {show}
      </div>
    )
  }
}

export default Notes;
