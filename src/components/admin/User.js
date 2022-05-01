import React from "react";
import UserProducts from "./UserProducts";

const User = ({ user }) => {
  const [showProducts, setShowProducts] = React.useState(false);
  return (
    <li>
      {showProducts ? (
        <UserProducts user={user} />
      ) : (
        <ul>
          <li>
            <strong>Name: </strong>
            {user.name}
          </li>
          <li>
            <strong>Email: </strong>
            {user.email}
          </li>
          <li>
            <strong>Phone: </strong>
            {user.phone}
          </li>
          <li>
            <strong>Address: </strong>
            {user.address}
          </li>
          <li>
            <strong>Added On: </strong>
            {new Date(user.createdAt).toLocaleString()}
          </li>
        </ul>
      )}

      <br />
      <button onClick={() => {setShowProducts(!showProducts)}}>
        {showProducts ? "Back" : `Products added by ${user.name}`}
      </button>
    </li>
  );
};

export default User;
