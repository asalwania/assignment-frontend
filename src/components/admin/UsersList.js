import React from "react";
import { useQuery } from "react-query";
import { getUsers } from "../../api/axios";
import User from "./User";

const UsersList = () => {
  const { isLoading, error, data } = useQuery("users", getUsers);
  if (isLoading) return "Loading...";
  if (error) return "An error occured";
  return (
    <div>
      {/* Users:[{products:[name,price,added on, updated on]},{deleted on}] */}
      <ol>
        {data?.data?.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </ol>
    </div>
  );
};

export default UsersList;
