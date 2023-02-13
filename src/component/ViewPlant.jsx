
import React, { Component } from "react";
import ViewPlant from "../modules/view/ViewPlant";

class ViewPlantComponent extends Component {
  

  constructor(props) {
    super(props)
}
  
  render () {
    return (
      <div  className="App">
        
          <ViewPlant></ViewPlant>
      </div>
    );
  }
  
};
  
export default ViewPlantComponent;