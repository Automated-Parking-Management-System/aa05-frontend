import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function createData(spotId, rate, available) {
  return { spotId, rate, available };
}

const rows = [
  createData("A1", 5, true),
  createData("A2", 2, true),
  createData("B1", 10, false),
  createData("B2", 7, false),
  createData("G3", 12, true),
];

export default function BookingTable({ handleBook }) {
  const getBookBtn = (available) => {
    return (
      <Button variant="contained" onClick={handleBook} disabled={available}>
        Book
      </Button>
    );
  };
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>spotId</TableCell>
            <TableCell align="left">rate/hr</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.spotId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.spotId}
              </TableCell>
              <TableCell align="left">{row.rate}</TableCell>
              <TableCell align="left">{getBookBtn(row.available)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
