import React, { Component } from "react";
import { FaUser, FaEnvelope, FaLock, FaTimes } from "react-icons/fa";
import "./Signup.scss";

class Signup extends Component {
  render() {
    return (
      <div className="signup-container">
        <form>
          <div className="close">
            <FaTimes />
          </div>
          <div className="input">
            <FaUser />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="input">
            <FaEnvelope />
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="input">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="input">
            <FaLock />
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Passsword"
              required
            />
          </div>
        </form>
      </div>
    );
  }
}
export default Signup;
