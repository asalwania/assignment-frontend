import React from "react";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAllSessions, getUsers } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const UserActivities = () => {
  const { isLoading, data } = useQuery("sessions", () =>
    getAllSessions({ userId: user._id })
  );

  const navigate = useNavigate();

  const { data: users } = useQuery("users", () => getUsers());

  const params = useParams();
  const user = users?.data?.find((user) => user._id === params.userId);
  if (isLoading) return "...Loading";
  return (
    <TableContainer component={Paper}>
      <h1>Sessions of {user.name}</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Started</TableCell>
            <TableCell align="center">Ended</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.sessions?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                {row.isActive ? "Active" : "Closed"}
              </TableCell>
              <TableCell align="center">
                {new Date(row.loggedInAt).toLocaleString()}
              </TableCell>
              <TableCell align="center">
                {row.loggedOutAt
                  ? new Date(row.loggedOutAt).toLocaleString()
                  : "Not closed"}
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => navigate(`/admin/${row._id}/products`)}>
                  products added in this session
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserActivities;
