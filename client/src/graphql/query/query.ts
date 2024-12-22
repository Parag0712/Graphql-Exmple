import { gql } from "@apollo/client";

export const getUsers = gql`
query getUsers {
  users {
    _id
    email
  }
}
`;
export const getDemoUser = gql`
query demoUser {
  demoUser {
    id
    email
  }
}
`;

export const createUser = gql` 
mutation createUser($email: String!, $username: String!, $password: String!) {
    newUser(email: $email,username: $username,password: $password)
}
`;
export const deleteUser = gql`
mutation myMutaion($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
}
`;

export const updateUser = gql`
mutation updateUser($id: ID!, $email: String!, $username: String!) {
    updateUser(id: $id, email: $email, username: $username)
}
`;
