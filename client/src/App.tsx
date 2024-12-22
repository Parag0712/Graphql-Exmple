import { useLazyQuery, useMutation } from "@apollo/client";
import { createUser, getDemoUser, getUsers, deleteUser, updateUser } from "./graphql/query/query";
import { useState } from "react";
import "./index.css";

function App() {
  const [getUsersQuery, { data, loading, error }] = useLazyQuery(getUsers);
  const [
    demoUserQuery,
    { data: demoUser, loading: demoUserLoading, error: demoUserError },
  ] = useLazyQuery(getDemoUser);
  const [
    createUserMutation,
    {
      data: createUserData,
      loading: createUserLoading,
      error: createUserError,
    },
  ] = useMutation(createUser, {
    onCompleted: (result) => {
      console.log(result);
    },
    refetchQueries: [{ query: getUsers }, { query: getDemoUser }],
  });

  const [deleteUserMutation] = useMutation(deleteUser, {
    onCompleted: () => {
      alert("User deleted successfully");
    },
    refetchQueries: [{ query: getUsers }, { query: getDemoUser }],
  });

  const [updateUserMutation] = useMutation(updateUser, {
    onCompleted: () => {
      alert("User updated successfully");
    },
    refetchQueries: [{ query: getUsers }, { query: getDemoUser }],
  });

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editingUser, setEditingUser] = useState<{ id: string; email: string; username: string } | null>(null);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation({ variables: { email, username, password } });
    setEmail("");
    setUsername("");
    setPassword("");
  };

  const handleDeleteUser = (id: string) => {
    console.log(id);
    deleteUserMutation({ variables: { deleteUserId: id } });
  };

  const handleEditUser = (user: { id: string; email: string; username: string }) => {
    setEditingUser(user);
    setEmail(user.email);
    setUsername(user.username);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUserMutation({ variables: { id: editingUser.id, email, username } });
      setEditingUser(null);
      setEmail("");
      setUsername("");
    }
  };

  const isLoading = loading || demoUserLoading || createUserLoading;
  const errorMessage = error?.message || demoUserError?.message || createUserError?.message;

  return (
    <div className="container">
      <h1>User Management</h1>
      
      <div className="card">
        <h2>{editingUser ? "Edit User" : "Create New User"}</h2>
        <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              required
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              required
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {!editingUser && (
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                required
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Processing..." : editingUser ? "Update User" : "Create User"}
          </button>
          {editingUser && (
            <button type="button" className="btn" onClick={() => setEditingUser(null)}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="card">
        <h2>User Actions</h2>
        <div className="button-group">
          <button onClick={() => getUsersQuery()} className="btn">Get Users</button>
          <button onClick={() => demoUserQuery()} className="btn">Get Demo User</button>
        </div>
      </div>

      {isLoading && <div className="loader">Loading...</div>}

      {errorMessage && (
        <div className="error-message">
          Error: {errorMessage}
        </div>
      )}

      {createUserData && (
        <div className="success-message">
          New User Created: {createUserData.newUser.email}
        </div>
      )}
        {data && (
          <div className="card">
            <h2>All Users</h2>
            <ul className="user-list">
              {data.users.map((item: { _id: string; email: string; username: string }) => (
                <li key={item._id}>
                  {item.email} - {item.username}
                </li>
              ))}
            </ul>
          </div>
        )}

        {demoUser && (
          <div className="card">
            <h2>Demo Users</h2>
            <ul className="user-list">
              {demoUser.demoUser.map((item: { id: string; email: string; username: string }) => (
                <li key={item.id}>
                  {item.email} - {item.username}
                  <div className="button-group">
                    <button onClick={() => handleEditUser({ id: item.id, email: item.email, username: item.username })} className="btn btn-small">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUser(item.id)} className="btn btn-small btn-danger">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export default App;

