import React from 'react';

const Trip = (props) => {
  return(
    <div>
      <div onClick={props.handleSelectTrip}>{props.name}</div>
      <button onClick={props.handleDeleteTrip}>Delete</button>
    </div>
  )
}

export default Trip;
