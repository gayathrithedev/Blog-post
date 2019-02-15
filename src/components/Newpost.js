import React, { Component } from "react";
import fire from "../config/Fire";
class Newpost extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection("postss");
    this.state = {
      title: "",
      description: "",
      author: fire.auth().currentUser.email,
      datetime: ""
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.state.datetime);
  };

  onSubmit = e => {
    e.preventDefault();

    const { author, title, description, datetime } = this.state;

    this.ref
      .add({
        author,
        title,
        description,
        datetime: fire.firestore.FieldValue.serverTimestamp()
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
      <div className="addpost">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.onChange}
            placeholder="Title"
            required
          />
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={this.onChange}
            placeholder="Description"
            required
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}
export default Newpost;
