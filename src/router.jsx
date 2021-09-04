import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Popular from './popular'




function AppRouter() {
    return (
        <div>
        <Router>
            <Route exact path="/" component={Popular}/>
        </Router>
        </div>
    );
  }
  
export default AppRouter;