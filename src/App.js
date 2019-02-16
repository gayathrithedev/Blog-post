import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
// import fire from "./config/Fire";
// import Login from "./components/Login";
// import Home from "./components/Home";
import Index from "./components/Index/Index";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: null
    };
    // this.authListener = this.authListener.bind(this);
  }
  // componentDidMount() {
  //   this.authListener();
  // }
  // authListener() {
  //   fire.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({ user });
  //     } else {
  //       this.setState({ user: null });
  //     }
  //   });
  // }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Index} exact />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
