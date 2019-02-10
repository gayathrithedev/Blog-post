import React, { Component } from "react";
import fire from "../config/Fire";
import Editpost from "./Editpost";
import Latestpost from "./Latespost";

class Showpost extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection("postss");
    this.connect = null;
    this.state = {
      postss: [],
      keyid: "",
      flag: false,
      author: fire.auth().currentUser.email,
      latest: false
    };
    this.editPost = this.editPost.bind(this);
  }

  onCollectionUpdate = querySnapshot => {
    const postss = [];
    querySnapshot.forEach(doc => {
      const { title, description, author, datetime } = doc.data();
      postss.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        datetime
      });
    });
    this.setState({
      postss
    });
  };

  componentDidMount() {
    this.connect = this.ref
      .orderBy("datetime", "desc")
      .onSnapshot(this.onCollectionUpdate);
  }

  onChange = e => {
    this.setState[e.target.name] = e.target.value;
    console.log(e.target.value);
  };

  singlepost = key => {
    this.setState({
      keyid: key,
      latest: true
    });
  };

  deletePost = id => {
    fire
      .firestore()
      .collection("postss")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Post successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing post: ", error);
      });
    this.setState({
      latest: false
    });
  };

  editPost() {
    this.setState({
      flag: !this.state.flag,
      showEdit: true
    });
  }

  render() {
    var postkey = this.state.keyid;
    return (
      <div className="postlist">
        <div className="scrollparent">
          <div className="scroll">
            <table>
              <thead>
                <tr />
              </thead>
              <tbody>
                {this.state.postss.map(post => {
                  if (post.author === fire.auth().currentUser.email)
                    return (
                      <tr onClick={() => this.singlepost(post.key)}>
                        <td>{post.title}</td>
                        {console.log(post.datetime)}
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.latest ? (
          <div className="singlepost">
            {this.state.postss.map(post => {
              if (post.key === postkey)
                return (
                  <div>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <div className="operations">
                      <button onClick={this.editPost}>edit</button>
                      <button onClick={() => this.deletePost(post.key)}>
                        delete
                      </button>
                    </div>
                    <div className="edit">
                      {this.state.flag ? <Editpost postData={post} /> : null}
                    </div>
                  </div>
                );
            })}
          </div>
        ) : (
          <Latestpost />
        )}
      </div>
    );
  }
}
export default Showpost;
