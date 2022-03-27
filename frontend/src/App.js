import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Testing from './component/Testing';
import AddEmployees from './component/StaffManagement/AddEmployees';
import Login from './component/Common/Login';
import ViewAllEmployee from './component/StaffManagement/ViewAllEmployee';

import AddCustomer from './component/CustomerManagement/AddCustomer';
import Header from './component/Common/Headers/Header';




function App() {

  return (
    <Router>
      <div>
        <Route path="/" component={Header}/>
        <Route path="/testing" exact component={Testing} />
        <Route path="/user/addstaff" exact component={AddEmployees}/>
        <Route path="/public/login" exact component={Login}/>
        <Route path="/user/viewallstaff" exact component={ViewAllEmployee}/>
        <Route path="/register" exact component={AddCustomer}/>
      </div>
    </Router>
    
  );
}

export default App;
