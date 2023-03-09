import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';


const GET_USERS = gql`
query Query($page: Int, $limit: Int, $search: String) {
    getAllUser(page: $page, limit: $limit, search: $search)
  }
`;

const UPDATE_USER = gql`
mutation Mutation($updateUserId: Int, $name: String, $email: String) {
    updateUser(id: $updateUserId, name: $name, email: $email)
  }
`;

const DELETE_USER = gql`
mutation DeleteUser($deleteUserId: Int) {
    deleteUser(id: $deleteUserId)
  }
`;

function UserList() {
  const [updateUserId, setUpdateUserId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables: { page: 1, limit: 10, search: null },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setUpdateUserId(null);
      setName('');
      setEmail('');
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdate = (user) => {
    setUpdateUserId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleSave = () => {
    updateUser({
      variables: {
        updateUserId,
        name,
        email,
      },
    });
  };

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  
  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser({
        variables: {
          deleteUserId: userId,
        },
      });
    }
  };
  

  const handleCancel = () => {
    setUpdateUserId(null);
    setName('');
    setEmail('');
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
         <div>
          <center>
      <h2>User List</h2>
      </center>
      <Link className='btn btn-primary' to="/AddUser">Add User</Link>
         </div>
         <br></br>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.getAllUser.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {updateUserId === user.id ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {updateUserId === user.id ? (
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {updateUserId === user.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleUpdate(user)}>Update</button>
                )}
               
              </td>
              <td>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
