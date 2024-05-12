import React, { Component } from "react";

export class Test extends Component {
  componentDidMount() {
    console.log("Mount Phase");
  }

  render() {
    return <div>Test</div>;
  }
}

export default Test;
