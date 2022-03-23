import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Testing from './component/Testing';
import Login from './component/Common/Login';



function App() {

  return (
    <Router>
      <div>
        <Route path="/testing" exact component={Testing} />
        <Route path="/public/login" exact component={Login}/>
      </div>
    </Router>
    
  );
}

export default App;
