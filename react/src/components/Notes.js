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
    this.handleDelete = this.handleDelete.bind(this);
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
          noteBody: body.body,
          noteId: body.id
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getNote();
  }

  showHide(event) {
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
    if (this.state.noteId === undefined || this.state.noteId === null) {
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
        .then((body) => {
          this.setState({ noteId: body.id });
        }, this.setState({page: false}))
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      let fetchBody = { body: this.state.noteBody };
      let updatedNotes;
      fetch(`/api/v1/activities/${this.state.activityId}/notes/${this.state.noteId}`,
        { method: "PATCH",
        body: JSON.stringify(fetchBody) })
        .then(function(response) {
          updatedNotes = response.json();
          return updatedNotes;
        }).then((response) => this.setState({page: false })
      );
    }
  }

  handleDelete(event){
    event.preventDefault();
    let noteArray = [];
    fetch(`/api/v1/activities/${this.state.activityId}/notes/${this.state.noteId}`,
      { method: "DELETE"
      }).then(function(response) {
          noteArray = response.json();
          return noteArray;
      }).then((response) => this.setState({noteBody: "" }),
                            this.setState({page: false }),
                            this.setState({noteId: null })
    );
  }

  render() {
    let show;
    if (this.state.page) {
      show =
      <Note
        id={this.state.noteId}
        key={this.state.noteId}
        getBody={this.getBody}
        addNote={this.addNote}
        noteBody={this.state.noteBody}
        handleDelete={this.handleDelete}
      />
    }


    return(
      <div>
        <button className="react-button" onClick={this.showHide}>
          Add Note
        </button>
        {show}
        <p id="note-text">{this.state.noteBody}</p>
      </div>
    )
  }
}

export default Notes;
