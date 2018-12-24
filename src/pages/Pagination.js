import React from "react";
import { Query } from "react-apollo";
import { USER_GET_REPO } from "../models/graphQLqueries";
import { Pane, Text } from "evergreen-ui";

import Graph from "../components/Graph.js";

const Pagination = props => {
  let arrRepo = [];

  const variables = {
    login: process.env.REACT_APP_GITHUB_LOGIN,
    cursor: null
  };

  return (
    <>
      <Query query={USER_GET_REPO} variables={variables}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) {return <span>---- <span role="img" aria-label="loading">⏳</span> LOADING <span role="img" aria-label="loading">⏳</span> ----</span>;}
          if (error) {return <span>---- <span role="img" aria-label="error">🛑</span> ERROR <span role="img" aria-label="error">🛑 </span>----</span>}

          const { pageInfo } = data.user.repositories;

          if (pageInfo.hasNextPage) {
            arrRepo.push(data.user.repositories.nodes[0]);
            fetchMore({
              variables: { cursor: pageInfo.endCursor },
              updateQuery: (prev, { fetchMoreResult }) => {
                return Object.assign({}, prev, fetchMoreResult);
              }
            });
          } else {
            console.log("📦", arrRepo);
            let labels = [];
            let colors = [];
            let datas = [];
            arrRepo.map(function(item, i){
              if (item.primaryLanguage) {
                let index = labels.findIndex(function(elem) {
                  return elem === item.primaryLanguage.name;
                });
                if (index < 0) {
                  labels.push(item.primaryLanguage.name);
                  datas.push(item.defaultBranchRef.target.history.totalCount);
                }
                else {
                  datas[index] += item.defaultBranchRef.target.history.totalCount;
                }
                let color = item.primaryLanguage.color === "#555555" ? "rgb(8, 122, 108)":item.primaryLanguage.color;
                colors.push(color)
              }
            })
            console.log(datas);
            return (
              <Pane elevation={1} padding="15px" className="flav-pane">
                <Graph
                  style={{ width: "100%", height: "100%" }}
                  type={"polarArea"}
                  data={{
                     labels: labels,
                     datasets: [{data: datas, backgroundColor: colors}]
                 }}
                />
              </Pane>
            );
          }
          return (
            <Pane elevation={1} className="flav-pane">
              <Text><span role="img" aria-label="loading">⏳</span> LOADING <span role="img" aria-label="loading">⏳</span></Text>
            </Pane>
          );
          }
        }
      </Query>
    </>
  );
};
export default Pagination;
