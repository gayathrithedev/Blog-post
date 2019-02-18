import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Index from "./components/Index/Index";
import Newpost from "./components/Newpost/Newpost";
import Show from "./components/Show/Show";
import Mypost from "./components/Mypost/Mypost";
import Edit from "./components/Edit/Edit";
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Index} exact />
            <Route path="/newpost" component={Newpost} />
            <Route path="/show/:id" component={Show} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/myposts" component={Mypost} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
