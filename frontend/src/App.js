import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Testing from "./component/Testing";
import Rooms from "./component/RoomManagement/Rooms";

function App() {
  return (
    <Router>
      <div>
        <Route path="/testing" exact component={Testing} />
        <Route path="/rooms" exact component={Rooms} />
      </div>
    </Router>
  );
}

export default App;
