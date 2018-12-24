import React, { Component } from "react";
import Chart from "chart.js";

class Graph extends Component {
  componentDidMount() {
    const node = this.node;
    const { type, data, options } = this.props;
    new Chart(node, { type, data, options });
  }
  render() {
    const { style } = this.props;
    return (
      <>
        <canvas style={style} ref={node => (this.node = node)} />
      </>
    );
  }
}

export default Graph;
