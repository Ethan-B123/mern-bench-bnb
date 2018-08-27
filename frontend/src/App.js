import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.loginTest = this.loginTest.bind(this);
    this.loginTest();
    window.axios = axios;
  }

  loginTest() {
    // axios({
    //   method: "post",
    //   url: "/api/users/login",
    //   body: {
    //     email: "tuptain@appacademy.io",
    //     password: "password123"
    //   }
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    axios.get("/api/tweets").then(tweet => console.log(tweet));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and don't save to reload.
        </p>
      </div>
    );
  }
}

export default App;
