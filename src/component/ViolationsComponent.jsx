
import React, { Component } from "react";
import ViewViolaitons from "../modules/view/Violations";

class ViolationsComponent extends Component {
  
  constructor(props) {
    super(props)
}
  
  render () {
    return (
      <div  className="App">
          <ViewViolaitons></ViewViolaitons>
      </div>
    );
  }
  
};
  
export default ViolationsComponent;