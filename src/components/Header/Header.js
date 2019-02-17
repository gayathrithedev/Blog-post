import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import "./Header.scss";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import firebase from "../../config/Fire";
import Newpost from "../Newpost/Newpost";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloggedin: false,
      user: null,
      users: []
    };
    this.authListener = this.authListener.bind(this);
    this.ref = firebase.firestore().collection("users");
    this.connect = null;
  }

  onCollectionUpdate = querySnapshot => {
    const users = [];
    querySnapshot.forEach(doc => {
      const { username, email, avatarURL } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        username,
        email,
        avatarURL
      });
    });
    this.setState({
      users
    });
  };

  componentDidMount() {
    this.authListener();
    this.connect = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  showsignup() {
    var form = document.getElementById("signupform");
    form.style.display = "block";
  }

  showlogin() {
    var form = document.getElementById("loginform");
    form.style.display = "block";
  }

  logout() {
    firebase.auth().signOut();
  }

  showCreatePost() {
    var form = document.getElementById("newpost");
    form.style.display = "block";
  }

  render() {
    var myname = "";
    return (
      <div className="header-container">
        <div className="header">
          <div className="toplayout">
            <div className="logo">Awesome Blog</div>
            {this.state.user === null ? (
              <div className="auth">
                <button onClick={this.showlogin}>Sign In</button>
                <button href="" onClick={this.showsignup} className="register">
                  Get Started
                </button>
              </div>
            ) : (
              <div className="me">
                {this.state.users.map(user => {
                  if (user.email === firebase.auth().currentUser.email)
                    return (
                      <div className="myinfo">
                        <img src={user.avatarURL} alt="myimage" />
                        <p>{(myname = user.username)}</p>
                      </div>
                    );
                })}
                <ul>
                  <li>Hi, {myname}</li>
                  <li onClick={this.showCreatePost}>create new post</li>
                  <li>My profile</li>
                  <li>Bookmarks</li>
                  <li>Help</li>
                  <li onClick={this.logout}>logout</li>
                </ul>
              </div>
            )}
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
export default Header;
