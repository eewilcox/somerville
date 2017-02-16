import React from 'react';

const Trip = (props) => {
  return(
    <div className="small-12 medium-5 small-centered columns">
      <h6 id="select-name">
        {props.name}
      </h6>
      <button className="react-button" id="select-button" onClick={props.handleSelectTrip}>
        Select
      </button>
    </div>
  )
}

export default Trip;
