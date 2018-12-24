import React, { Component } from "react";
import { Pane } from "evergreen-ui";
import { Query } from "react-apollo";
import { USER_GET_REPO } from "../models/graphQLqueries";

import Graph from "../components/Graph.js";

class LanguagesGraph extends Component {
  render() {
    return (
      <Query
        query={USER_GET_REPO}
        variables={{ login: process.env.REACT_APP_GITHUB_LOGIN }}
      >
        {({ loading, error, data: { user } }) => {
          if (loading) {
            return <span>loading...</span>;
          }
          let type = "polarArea";
          let options = null;
          let style = { width: "100%", height: "100%" };
          let languages = [];
          let colors = [];
          let repository = user.repositories.nodes;
          console.log("😎", user);
          for (var i = 0; i < repository.length; i++) {
            if (repository[i].primaryLanguage) {
              if (repository[i].primaryLanguage.name in languages) {
                languages[repository[i].primaryLanguage.name] +=
                  repository[i].defaultBranchRef.target.history.totalCount;
              } else {
                languages[repository[i].primaryLanguage.name] =
                  repository[i].defaultBranchRef.target.history.totalCount;
              }
              if (!colors.includes(repository[i].primaryLanguage.color)) {
                colors.push(repository[i].primaryLanguage.color);
              }
            }
          }
          var datas = test.some(function(item, index) {
            console.log(item);
            console.log(index);
          });
          console.log(datas);
          console.log(languages);
          return (
            <Pane elevation={1} width="100% !important" className="flav-pane">
              <Graph
                style={style}
                type={type}
                data={{
                  labels: languages,
                  datasets: [{ backgroundColor: colors, data: languages }]
                }}
                options={options}
              />
            </Pane>
          );
        }}
      </Query>
    );
  }
}
export default LanguagesGraph;
