import React, { Component } from "react";
import fire from "../config/Fire";
import "./Home.scss";
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
      <div className="containerlayout">
        <div className="navbar">
          <div className="profile">
            <button onClick={this.logout}>logout</button>
          </div>
        </div>
        <div className="postcontainer">
          <div className="postlist">Home</div>
          <div className="showpost">Post</div>
        </div>
      </div>
    );
  }
}
export default Home;
