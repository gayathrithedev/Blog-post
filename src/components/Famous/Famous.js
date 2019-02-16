import React, { Component } from "react";
import RecentPost from "../Recentpost/Recentpost";
import Listpost from "../Listpost/Listpost";

class Famous extends Component {
  render() {
    return (
      <div className="famous-container">
        <div className="allpost">
          <div className="recentpost">
            <RecentPost />
          </div>
          <div className="listpost">
            <Listpost />
          </div>
        </div>
      </div>
    );
  }
}
export default Famous;
