import React, { Component } from "react";
import fire from "../config/Fire";
import Editpost from "./Editpost";

class Showpost extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection("posts");
    this.unsubscribe = null;
    this.state = {
      posts: [],
      keyid: "",
      flag: false,
      clsname: ""
    };
    this.editPost = this.editPost.bind(this);
  }

  onCollectionUpdate = querySnapshot => {
    const posts = [];
    querySnapshot.forEach(doc => {
      const { title, description, author } = doc.data();
      posts.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author
      });
    });
    this.setState({
      posts
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  singlepost = key => {
    this.setState({
      keyid: key
    });
  };

  deletePost = id => {
    fire
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  };

  editPost() {
    this.setState({
      flag: !this.state.flag
    });
  }

  render() {
    var postkey = this.state.keyid;
    return (
      <div className="postlist">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => {
              if (post.author === fire.auth().currentUser.email)
                return (
                  <tr onClick={() => this.singlepost(post.key)}>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
        <div className="singlepost">
          hi
          {this.state.posts.map(post => {
            if (post.key === postkey)
              return (
                <div>
                  <form>
                    <input
                      type="text"
                      value={post.title}
                      onChange={this.onChange}
                      readOnly={!this.state.flag}
                    />
                    <input
                      type="text"
                      value={post.description}
                      onChange={this.onChange}
                      readOnly={!this.state.flag}
                    />
                  </form>
                  <button onClick={this.editPost}>edit</button>
                  <div className="edit">
                    {this.state.flag ? <Editpost postData={post} /> : null}
                  </div>
                  <button onClick={() => this.deletePost(post.key)}>
                    delete
                  </button>
                </div>
              );
          })}
        </div>
      </div>
    );
  }
}
export default Showpost;
