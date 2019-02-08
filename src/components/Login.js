import React, { Component } from "react";
import fire from "../config/Fire";
import "./Login.scss";
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
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.login}>
              LogIn
            </button>
          </form>
        </div>
        <div className="welcome">
          <h3>Welcome</h3>
          <h4>Don't have an account please sign up here...</h4>
          <button onClick={this.signup}>SignUp</button>
        </div>
      </div>
    );
  }
}
export default Login;
