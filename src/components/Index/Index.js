import React, { Component } from "react";
import "./Index.scss";
import Header from "../Header/Header";
import Famous from "../Famous/Famous";
import Newpost from "../Newpost/Newpost";

class Index extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Famous />
        <Newpost />
      </div>
    );
  }
}
export default Index;
