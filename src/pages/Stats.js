import React from "react";
import { Pane, Text } from "evergreen-ui";
import { Query } from "react-apollo";
import { USER_GET_STATS } from "../models/graphQLqueries";

const Stats = () => (
  <Query query={USER_GET_STATS} variables={{login: process.env.REACT_APP_GITHUB_LOGIN}}>
    {({ loading, error, data: { user }}) => {
      if (loading) {
        return <span>=== WAIT === </span>;
      }
      if (error) {
        console.log(error);
        return <span>=== ERROOOOOR === </span>;
      }

      const repositories = user.repositories
      let commitsNb = 0;
      let codesLineNb = 0;
      for (var i = 0; i < repositories.nodes.length; i++) {
        if (!repositories.nodes[i].defaultBranchRef !== null) {
        commitsNb += repositories.nodes[i].defaultBranchRef.target.history.totalCount
        for (var y = 0; y < repositories.nodes[i].defaultBranchRef.target.history.nodes.length; y++) {
          if ("additions" in repositories.nodes[i].defaultBranchRef.target.history.nodes[y]) {
            codesLineNb += repositories.nodes[i].defaultBranchRef.target.history.nodes[y].additions;
          }
          if ("deletions" in repositories.nodes[i].defaultBranchRef.target.history.nodes[y]) {
            codesLineNb -= repositories.nodes[i].defaultBranchRef.target.history.nodes[y].deletions;
          }
        }
      }
      }
      return (
        <div>
        <Pane elevation={1} className="flav-pane">
          <Text><strong>{user.followers.totalCount}</strong> followers</Text>
          <Text><strong>{user.following.totalCount}</strong> following</Text>
        </Pane>
        <Pane elevation={1} className="flav-pane">
          <Text><strong>{repositories.totalCount}</strong> Repos</Text>
          <Text><strong>{commitsNb}</strong> Commits</Text>
          <Text><strong>{codesLineNb}</strong> Lines of code</Text>
        </Pane>
        </div>
      );
    }}
  </Query>
);

export default Stats;
