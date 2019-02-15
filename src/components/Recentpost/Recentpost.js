import React, { Component } from "react";

class RecentPost extends Component {
  render() {
    return (
      <div className="recentpost-container">
        <div className="post1">
          <img src={require("../../image/foodpost.jpg")} alt="post1" />
          <h3>Lorem ipsum dollor sit amit loreal paris lakme google amazon</h3>
        </div>
        <div className="post2">2</div>
      </div>
    );
  }
}
export default RecentPost;
