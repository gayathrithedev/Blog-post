import React, { Component } from "react";
import fire from "../config/Fire";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }
  logout() {
    fire.auth().signOut();
  }
  render() {
    return (
      <div>
        Home
        <button onClick={this.logout}>logout</button>
      </div>
    );
  }
}
export default Home;
