
import React, { Component } from "react";
import OneContainer from "../modules/ViewContainer";

class ViewContainer extends Component {
  

  constructor(props) {
    super(props)
}
  
  render () {
    return (
      <div  className="App">
        
          <OneContainer></OneContainer>
      </div>
    );
  }
  
};
  
export default ViewContainer;