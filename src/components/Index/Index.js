import React, { Component } from "react";
import "./Index.scss";
import Header from "../Header/Header";
import Famous from "../Famous/Famous";

class Index extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Famous />
      </div>
    );
  }
}
export default Index;
