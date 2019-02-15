import React, { Component } from "react";
import "./App.css";
// import fire from "./config/Fire";
// import Login from "./components/Login";
// import Home from "./components/Home";
import Index from "./components/Index/Index";
import Signup from "./components/Signup/Signup";
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
        <Index />
        <Signup />
      </div>
    );
  }
}

export default App;
