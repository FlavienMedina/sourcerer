import React from "react";
import { Pane, Text } from "evergreen-ui";
import { Query } from "react-apollo";
import { USER_GET } from "../models/graphQLqueries";

import Stats from "./Stats";
import Pagination from "./Pagination";

const Datas = () => (
  <Query query={USER_GET} variables={{ login: process.env.REACT_APP_GITHUB_LOGIN, }}>
    {({ loading, error, data: { user } }) => {
      if (loading) {
        return <span>loading...</span>;
      }
      console.log("😎", user);
      return (
        <Pane elevation={1} className="flav-pane">
          <img alt="avatar" src={user.avatarUrl} height={100} width={100} />
          <Text>
            <strong>{user.name}</strong>
          </Text>
          <Text>{user.bio}</Text>
          <Text>{user.location}</Text>
        </Pane>
      );
    }}
  </Query>
);

const User = () => {
  return (
    <div>
      <Datas />
      <Stats />
      <Pagination />
    </div>
  );
};

export default User;
