import Home from "./pages/homePage.js";
import Pokemon from "./pages/pokemon.js";
import Admin from "./pages/admin.js";
import Pokedex from "./pages/pokedex.js"
import {
  BrowserRouter as Router,
  Switch,
  Route
}from "react-router-dom";

function App() {
  return <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pokemon">
            <Pokemon />
          </Route>
          <Route path="/pokedex">
            <Pokedex />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
    </Router>
}

export default App;