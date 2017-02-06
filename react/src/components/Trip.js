import React from 'react';

const Trip = (props) => {
  return(
    <div className="small-5 small-centered columns">
      <h6 id="select-name">{props.name}</h6>
      <div className="row">
        <button className="react-button" id="select-button" onClick={props.handleSelectTrip}>Select</button>
      </div>
    </div>
  )
}

export default Trip;
