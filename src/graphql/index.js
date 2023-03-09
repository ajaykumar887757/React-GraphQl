import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($name: String, $email: String) {
    createUser(name: $name, email: $email)
  }
`;
