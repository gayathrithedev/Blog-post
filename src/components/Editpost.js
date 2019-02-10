import React, { Component } from "react";
import fire from "../config/Fire";

class Editpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      author: "",
      title: "",
      description: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      key: this.props.postData.key,
      title: this.props.postData.title,
      description: this.props.postData.description,
      author: this.props.postData.author
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ post: state });
  };

  onSubmit(e) {
    e.preventDefault();
    const { author, title, description } = this.state;
    const updateRef = fire
      .firestore()
      .collection("posts")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description,
        author
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
  }

  render() {
    return (
      <div>
        im edit post component
        <div className="post">
          data
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="title"
              defaultValue={this.props.postData.title}
              onChange={this.onChange}
            />
            <input
              type="text"
              name="description"
              defaultValue={this.props.postData.description}
              onChange={this.onChange}
            />
            <button type="submit">update me</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Editpost;
