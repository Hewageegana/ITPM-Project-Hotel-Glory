import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Testing from './component/Testing';



function App() {

  return (
    <Router>
      <div>
        <Route path="/testing" exact component={Testing} />
      </div>
    </Router>
    
  );
}

export default App;
