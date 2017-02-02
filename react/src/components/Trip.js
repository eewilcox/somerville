import React from 'react';

const Trip = (props) => {

  return(
    <div>
      <p onClick={props.handleSelectTrip}>{props.name}</p>
      <button onClick={props.handleDeleteTrip}>Delete</button>
    </div>
  )
}

export default Trip;
