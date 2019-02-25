import React, { Component } from "react";
import RecentPost from "../Recentpost/Recentpost";
import Listpost from "../Listpost/Listpost";
import "./Famous.scss";

class Famous extends Component {
  render() {
    return (
      <div className="famous-container">
        <div className="allpost">
          <div className="recentpost">
            <div className="heading">FAMOUS POST ________</div>
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
