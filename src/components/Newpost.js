import React, { Component } from "react";
import fire from "../config/Fire";
class Newpost extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection("posts");
    this.state = {
      title: "",
      description: "",
      author: fire.auth().currentUser.email
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

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
    return (
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
      </div>
    );
  }
}
export default Newpost;
