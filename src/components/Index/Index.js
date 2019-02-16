import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import "./Index.scss";
import Viewpost from "../Viewpost/Viewpost";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Famous from "../Famous/Famous";
import { FaTimes } from "react-icons/fa";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showsignup() {
    var form = document.getElementById("signupform");
    form.style.display = "block";
  }

  showlogin() {
    var form = document.getElementById("loginform");
    form.style.display = "block";
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <div className="toplayout">
            <div className="logo">Blog Journal</div>
            <div className="auth">
              <button onClick={this.showlogin}>Sign In</button>
              <button href="" onClick={this.showsignup} className="register">
                Get Started
              </button>
            </div>
          </div>

          <div className="navbar">
            <div className="menu">
              <ul>
                <li>
                  <a href="">LATEST POST</a>
                </li>
                <li>
                  <a href="">MOST VIEWED</a>
                </li>
                <li>
                  <a href="">TAGS</a>
                </li>
                <li>
                  <a href="">XXXXXX</a>
                </li>
                <li>
                  <a href="">YYYYYY</a>
                </li>
                <li>
                  <a href="">ZZZZZZ</a>
                </li>
              </ul>
            </div>
            <div className="search">
              <form className="searchresult">
                <input type="text" placeholder="Search" />
                <FaSearch />
              </form>
            </div>
          </div>
        </div>
        <Famous />
        <div id="signupform">
          <Signup />
        </div>
        <div id="loginform">
          <Login />
        </div>
      </div>
    );
  }
}
export default Index;
