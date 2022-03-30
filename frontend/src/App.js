import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Testing from './component/Testing';
import AddBooking from './component/BookingManagement/AddBooking';



function App() {

  return (
    <Router>
      <div>
        <Route path="/testing" exact component={Testing} />
        <Route path="/addbooking" exact component={AddBooking} />
      </div>
    </Router>
    
  );
}

export default App;
