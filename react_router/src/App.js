import React from 'react';
import {
  BrowserRouter, 
  Route,
  Link
} from 'react-router-dom';

import './App.css';

const Child = ({match}) => {
  // will output: 
  // match {path: "/:id", url: "/yahoo", isExact: true, params: {id: "yahoo"}}
  // /:id means the place holder and creator for params.id. Another example is 
  // /:thing will lead to a new {..., params: {thing: "yahoo"}}
  console.log('match', match);
  return (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <h2>Accounts</h2> 
        <ul>
          <li><Link to='/netflix'>Netflix</Link></li>
          <li><Link to='/zillow-group'>Zillow Group</Link></li>
          <li><Link to='/yahoo'>Yahoo</Link></li>
          <li><Link to='/modus-create'>Modus Create</Link></li>
        </ul>

        <Route path="/:id" component={Child}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
