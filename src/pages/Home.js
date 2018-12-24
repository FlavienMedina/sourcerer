import React from "react";
import Plop from "../components/Plop.js";
import { Pane, Text } from "evergreen-ui";

const Home = () => (
  <Pane elevation={1} className="flav-pane">
    <Text>
      <strong>Home</strong>
    </Text>
    <Text size={300}>
      <strong>Hello, world</strong>
    </Text>
    <Plop name="Flavien"/>
  </Pane>
);

export default Home;
