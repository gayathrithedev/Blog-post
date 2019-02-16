import React, { Component } from "react";
import { FaUser, FaEnvelope, FaLock, FaTimes } from "react-icons/fa";
import firebase from "../../config/Fire";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.signin = this.signin.bind(this);
  }

  loginclose() {
    var close = document.getElementById("loginform");
    close.style.display = "none";
  }

  signin(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  userDetails() {}

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  confirmPwd() {}

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.signin}>
          <div className="close">
            <FaTimes onClick={this.loginclose} />
          </div>
          <div className="input">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button onClick={this.userDetails} type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
