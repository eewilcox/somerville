import React from 'react';

const Trip = (props) => {

  return(
    <div>
      <p onClick={props.handleSelectTrip}>{props.name}</p>
      <li>{props.name.activity}</li>
      <button onClick={props.handleDeleteTrip}>Delete</button>
    </div>
  )
}

export default Trip;
