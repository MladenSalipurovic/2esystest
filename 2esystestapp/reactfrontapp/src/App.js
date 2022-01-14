import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Airport from "./pages/Airports";
import AddAirport from "./pages/AddAirport";
import EditAirport from "./pages/EditAirport";
import Airlines from "./pages/Airlines";
import AddAirlines from "./pages/AddAirlines";
import EditAirlines from "./pages/EditAirlines";

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Airport} />
            <Route path="/add-airport" component={AddAirport} />
            <Route path="/edit-airport/:id" component={EditAirport} />

            <Route exact path="/airline/:id" component={Airlines} />
            <Route path="/add-airline/:id" component={AddAirlines} />
            <Route path="/edit-airline/:id/:id2" component={EditAirlines} />
        </Switch>
    </Router>
  );
}

export default App;
