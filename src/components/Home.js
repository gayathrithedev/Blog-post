import React, { Component } from "react";
import fire from "../config/Fire";
import Showpost from "./Showpost";
import "./Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.ref = fire.firestore().collection("posts");
    this.state = {
      title: "",
      description: "",
      author: fire.auth().currentUser.email,
      user: "",
      uid: "",
      email: ""
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  logout() {
    fire.auth().signOut();
  }

  onSubmit = e => {
    e.preventDefault();

    const { author, title, description } = this.state;

    this.ref
      .add({
        author,
        title,
        description
      })
      .then(docRef => {
        this.setState({
          title: "",
          description: ""
        });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };
  render() {
    const { author, title, description } = this.state;
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
        <div className="postcontainer">
          <div className="create">
            <button>Create new post</button>
          </div>
          <div className="postlist">
            <h3>welcome</h3>
            <div className="newpost">
              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
                <textarea
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  placeholder="Description"
                />
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={this.onChange}
                />
                <button type="submit">submit</button>
              </form>
              <Showpost />
            </div>
          </div>
          <div className="showpost">Post</div>
        </div>
      </div>
    );
  }
}
export default Home;
