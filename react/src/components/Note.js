import React from 'react';

const Note = (props) => {
  return(
    <div>
      <form action="zones#index" className="small-11 small-centered columns">
        <textarea id="note" type="text" name="tripName" placeholder="Leave a note" defaultValue={`${props.noteBody}`} onChange={props.getBody}/>
        <button className="react-button" onClick={props.addNote} type="submit">Submit</button>
        <button id="delete" className="react-button" onClick={props.handleDelete}>Delete</button>
      </form>
    </div>
  )
}

export default Note;
