import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const CREATE_USER = gql`
  mutation CreateUser($name: String, $email: String) {
    createUser(name: $name, email: $email)
  }
`;

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    client.mutate({
      mutation: CREATE_USER,
      variables: {
        name: name,
        email: email
      }
    })
      .then(result => console.log(result))
      .catch(error => console.error(error));

    // clear the form fields
    setName('');
    setEmail('');
  }

  return (
    <div className="submit-form">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              name="email"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
        <div>
        <a  className='btn btn-primary' href="/">User List</a>
         </div>
         <br></br>
      </form>
      
    </div>
  );
};

export default AddUser;
