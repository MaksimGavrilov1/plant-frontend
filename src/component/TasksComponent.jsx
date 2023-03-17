import React, { Component } from "react";
import Tasks from "../modules/view/Tasks";

class TasksComponent extends Component {
  
  render () {
    return (
      <div className="App">
          <Tasks></Tasks>
      </div>
    );
  }
  
};
  
export default TasksComponent;