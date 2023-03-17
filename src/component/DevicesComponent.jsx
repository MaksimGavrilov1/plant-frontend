import React, { Component } from "react";
import ViewDevices from "../modules/view/ViewDevices";

class DevicesComponent extends Component {
  
  render () {
    return (
      <div className="App">
          <ViewDevices></ViewDevices>
      </div>
    );
  }
  
};
  
export default DevicesComponent;