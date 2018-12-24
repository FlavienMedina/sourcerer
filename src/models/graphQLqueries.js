import gql from "graphql-tag";

export const USER_GET = gql`
  query($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      location
      bio
    }
  }
`;

export const USER_GET_STATS = gql`
  query($login: String!) {
    user(login: $login) {
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER, last: 100) {
        totalCount
        nodes {
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  nodes {
                    additions
                    deletions
                  }
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

export const USER_GET_REPO = gql`
  query($cursor: String, $login: String!) {
    user(login: $login) {
      name
      repositories(first: 1, privacy: PUBLIC, after: $cursor) {
        totalCount
        nodes {
          name
          primaryLanguage {
            name
            color
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  nodes {
                    additions
                    deletions
                  }
                  totalCount
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
