import React, { Component } from "react";
import fire from "../config/Fire";
import "./Login.scss";
import { FaEnvelope, FaLock } from "react-icons/fa";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }
  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="form">
          <form>
            <h3>Login to Blogpost</h3>
            <div className="email">
              <div className="svg">
                <FaEnvelope />
              </div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="password">
              <div className="svg">
                <FaLock />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="submit">
              <button type="submit" onClick={this.login}>
                LogIn
              </button>
              <button onClick={this.signup}>SignUp</button>
            </div>
          </form>
        </div>
        <div className="welcome">
          <h3>Welcome</h3>
          <h4>Don't have an account please sign up here...</h4>
        </div>
      </div>
    );
  }
}
export default Login;
