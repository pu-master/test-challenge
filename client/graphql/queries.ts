import { gql } from '@apollo/client'

const GET_ACCOUNT = gql`
  query Account {
    account {
      firstName
      lastName
    }
  }
`

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const SIGNUP = gql`
  mutation Signup($firstName: String!, $lastName: String!, $phone: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, password: $password) {
      token
    }
  }
`

export {
  GET_ACCOUNT,
  LOGIN,
  SIGNUP,
}
