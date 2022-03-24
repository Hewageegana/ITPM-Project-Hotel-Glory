import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Testing from "./component/Testing";
import Rooms from "./component/RoomManagement/Rooms";
import AddRooms from "./component/RoomManagement/AddRooms";

function App() {
  return (
    <Router>
      <div>
        <Route path="/testing" exact component={Testing} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/addrooms" exact component={AddRooms} />
      </div>
    </Router>
  );
}

export default App;
