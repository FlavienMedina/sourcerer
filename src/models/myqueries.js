import gql from "graphql-tag";

export const GET_USER = gql`
  query {
    viewer {
      name
      login
      avatarUrl
      location
    }
  }
`;

export const GET_STATS = gql`
  query {
    viewer {
      followers{totalCount}
      following{totalCount}
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER, last: 100) {
        totalCount
        nodes {
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`;

// export const COUNT_COMMITS = gql``;

export const GET_REPOSITORIES = gql`
  query {
    viewer {
      repositories(first: 30) {
        edges {
          node {
            name
            projectsUrl
          }
        }
      }
    }
  }
`;
