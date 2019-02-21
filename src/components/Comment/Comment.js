import React, { Component } from "react";
import firebase from "../../config/Fire";
import "./Comment.scss";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("comments");
    this.connect = null;
    this.state = {
      comments: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const comments = [];
    querySnapshot.forEach(doc => {
      const { username, user, comment, avatarURL } = doc.data();
      comments.push({
        key: doc.id,
        doc, // DocumentSnapshot
        username,
        user,
        comment,
        avatarURL
      });
    });
    this.setState({
      comments
    });
  };

  componentDidMount() {
    this.connect = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="comment-container">
        {this.state.comments.map(comment => {
          return (
            <div className="comment">
              <div className="content">
                <img src={comment.avatarURL} alt="user profile" />
                {comment.username}
              </div>
              <div className="user-comment">{comment.comment}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Comment;
