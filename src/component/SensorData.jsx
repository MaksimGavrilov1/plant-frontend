import React, { Component } from "react";
import SensorDataTable from "../modules/SensorDataTable";

class SensorData extends Component {
  
  render () {
    return (
      <div className="App">
        <h1 style={{color:"blue"}}>Search</h1>
          <SensorDataTable></SensorDataTable>
      </div>
    );
  }
  
};
  
export default SensorData;