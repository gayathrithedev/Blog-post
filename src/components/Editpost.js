import React, { Component } from "react";
import fire from "../config/Fire";

class Editpost extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      flag: false,
      key: "",
      author: "",
      title: "",
      description: "",
      datetime: ""
    };
  }

  componentDidMount() {
    this.setState({
      key: this.props.postData.key,
      title: this.props.postData.title,
      description: this.props.postData.description,
      author: this.props.postData.author,
      datetime: this.props.postData.datetime
    });
    console.log(this.props.flagEdit);
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ post: state });
  };

  onSubmit(e) {
    e.preventDefault();
    alert("updated");
    const { author, title, description, datetime } = this.state;
    const updateRef = fire
      .firestore()
      .collection("postss")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description,
        author,
        datetime
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
          {this.state.flag ? null : (
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                name="title"
                defaultValue={this.props.postData.title}
                onChange={this.onChange}
              />
              <textarea
                name="description"
                defaultValue={this.props.postData.description}
                onChange={this.onChange}
              />
              <button type="submit">save</button>
            </form>
          )}
        </div>
      </div>
    );
  }
}
export default Editpost;
