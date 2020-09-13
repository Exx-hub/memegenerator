import React from "react";
import "../App.css";

import { Switch, Route } from "react-router-dom";

import Meme from "../Meme/Meme";
import MemeGenerated from "../MemeGenerated/MemeGenerated";

function App() {
  return (
    <>
      <h1>Meme Generator</h1>
      <Switch>
        <Route exact path="/" component={Meme} />
        <Route path="/:generated" component={MemeGenerated} />
      </Switch>
    </>
  );
}

export default App;
