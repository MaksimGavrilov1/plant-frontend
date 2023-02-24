
import React, { Component } from "react";
import ViewSetup from "../modules/view/ViewSetup";

class ViewSetupComponent extends Component {
  
  constructor(props) {
    super(props)
}
  
  render () {
    return (
      <div  className="App">
        
          <ViewSetup></ViewSetup>
      </div>
    );
  }
  
};
  
export default ViewSetupComponent;