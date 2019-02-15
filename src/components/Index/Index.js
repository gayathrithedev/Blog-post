import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import "./Index.scss";
import Famous from "../Famous/Famous";
import RecentPost from "../Recentpost/Recentpost";
import Listpost from "../Listpost/Listpost";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <div className="header">
          <div className="toplayout">
            <div className="logo">Blog Journal</div>
            <div className="auth">
              <a href="/login">Sign In</a>
              <a href="/register" className="register">
                Get Started
              </a>
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
          <div className="famous">
            <Famous />
          </div>
        </div>
        <div className="allpost">
          <div className="recentpost">
            <RecentPost />
          </div>
          <div className="listpost">
            <Listpost />
          </div>
        </div>
      </div>
    );
  }
}
export default Index;
