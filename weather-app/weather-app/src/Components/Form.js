import React from 'react';

//stateless component and this.state cannot be assigned on this component
//https://code.tutsplus.com/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541
const Form = props => {
  return (
    <div className="container h-100">
      <form onSubmit={props.loadweather}>
        <div>{props.error ? error() : ""}</div>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              autoComplete="off"
            />
          </div>
          
          {/**   */}
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              name="country"
              autoComplete="off"
            />
          </div>
          <div className="col-md-3 mt-md-0 mt-2 text-md-left ">
            <button className="btn btn-primary">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

//An alert message will pop up, if no city or country provided
const error = props => {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please Enter City and Country...!
    </div>
  );
};

export default Form;