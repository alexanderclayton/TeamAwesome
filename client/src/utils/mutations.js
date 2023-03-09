import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $avatar: String = "") {
    addUser(name: $name, email: $email, password: $password, avatar: $avatar) {
      token
      user {
        _id
        name
        avatar
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_IMAGE = gql`
  mutation addImage($downloadURL: String! ) {
    addImage(downloadURL: $downloadURL) {
      _id
      name
      images
    }
  }
`;

export const ADD_AVATAR = gql`
mutation addAvatar($downloadURL: String! ) {
  addAvatar(downloadURL: $downloadURL) {
    _id
    name
    avatar
  }
}
`;
