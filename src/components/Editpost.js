import React, { Component } from "react";
import fire from "../config/Fire";

class Editpost extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      flag: true,
      key: "",
      author: "",
      title: "",
      description: ""
    };
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
    this.setState({
      flag: false
    });
    console.log(this.state.flag);
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
        <div className="post">
          {this.state.flag ? (
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
              <button type="submit">save</button>
            </form>
          ) : null}
        </div>
      </div>
    );
  }
}
export default Editpost;
