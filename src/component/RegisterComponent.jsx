import React, { Component } from "react";
import SensorDataTable from "../modules/SensorDataTable";
import RegisterForm from "../functions/Register";

class RegisterComponent extends Component {
  
  render () {
    return (
      <div className="App">
          <RegisterForm />
      </div>
    );
  }
  
};
  
export default RegisterComponent;