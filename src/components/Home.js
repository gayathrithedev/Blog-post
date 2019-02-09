import React, { Component } from "react";
import fire from "../config/Fire";
import Showpost from "./Showpost";
import "./Home.scss";
import Newpost from "./Newpost";

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      flag: false,
      author: fire.auth().currentUser.email,
      user: "",
      uid: "",
      email: ""
    };
    this.addEvent = this.addEvent.bind(this);
  }

  logout() {
    fire.auth().signOut();
  }

  addEvent() {
    this.setState({
      flag: !this.state.flag
    });
  }

  render() {
    var user = fire.auth().currentUser;
    var email = user.email;
    var uid = user.uid;
    console.log(email, uid);
    return (
      <div className="containerlayout">
        <div className="navbar">
          <div className="profile">
            <button onClick={this.logout}>logout</button>
          </div>
        </div>
        <div className="create">
          <button onClick={this.addEvent}>Create new post</button>
        </div>
        <div className="newpost">{this.state.flag ? <Newpost /> : null}</div>
        <div className="postcontainer">
          <div className="showpost">
            <Showpost />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
