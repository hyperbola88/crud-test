import React from "react";

const UserList = ({ users, onClick, selectedUser }) => {
  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li className={selectedUser && selectedUser.id === user.id ? "selected" : ""} key={user.id} onClick={() => onClick(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;