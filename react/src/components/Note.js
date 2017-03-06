import React from 'react';

const Note = (props) => {
  return(
    <div>
      <form action="zones#index" className="small-11 small-centered columns">
        <input type="text" name="tripName" placeholder="Create a Note" onChange={props.getBody}/>
        <input onClick={props.addNote} type="submit"/>
      </form>
      {props.body}
    </div>
  )
}

export default Note;
