import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Testing from './component/Testing';
import AddEmployees from './component/StaffManagement/AddEmployees';



function App() {

  return (
    <Router>
      <div>
        <Route path="/testing" exact component={Testing} />
        <Route path="/user/addstaff" exact component={AddEmployees}/>
      </div>
    </Router>
    
  );
}

export default App;
