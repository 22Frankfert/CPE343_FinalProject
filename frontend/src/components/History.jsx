import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./appBar";
import { Table } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { TextField } from "@mui/material";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";

const columns = [
  { id: "id", label: "Case ID", minWidth: 170 },
  {
    id: "uploadTime",
    label: "วันที่อัปโหลด",
    minWidth: 170,
    align: "right",
  },
  { id: "result", label: "ผลการวินิจฉัย", minWidth: 100 },
  { id: "result", label: "ผลการวินิจฉัย", minWidth: 100 },
  { id: "drugAdministration", label: "แนวทางการรักษา", minWidth: 100 },
  { id: "drugDetail", label: "แนวทางการใช้ยา", minWidth: 100 },
  { id: "note", label: "หมายเหตุ", minWidth: 100 },
  { id: "other", label: "อื่นๆ", minWidth: 100 },
  // {
  //   history: {
  //     drugAdministration,
  //     drugDetail,
  //     note,
  //     other,
  //   },
  // },
];

function createData(uploadTime) {
  return { uploadTime };
}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row" align="right">
          {row.caseId}
        </TableCell>

        {/* <TableCell align="right">{row.calories}</TableCell> */}
        <TableCell align="right">{row.uploadTime}</TableCell>
        <TableCell align="right">{row.result}</TableCell>
        {/* <TableCell align="right">{row.protein}</TableCell> */}
        <TableCell sx={{ textAlign: "right" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                ดูข้อมูลเพิ่มเติม
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>แนวทางการรักษา</TableCell>
                    <TableCell>แนวทางการใช้ยา</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.id}
                      </TableCell>
                      <TableCell>{historyRow.id}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
                <TableBody>
                  {/* {row.history.map((historyRow) => ( */}
                  {row.history && (
                    <TableRow key={history.drugAdministration}>
                      <TableCell component="th" scope="row">
                        {history.drugAdministration}
                      </TableCell>
                      <TableCell>{history.drugDetail}</TableCell>
                      <TableCell align="right">{history.note}</TableCell>
                      <TableCell align="right">
                        {Math.round(history.other) / 100}
                      </TableCell>
                      {/* <TableCell align="right">
                        {Math.round(historyRow.other) / 100}
                      </TableCell> */}
                      {/* <TableCell component="th" scope="row">
                        {historyRow.id}
                      </TableCell> */}
                    </TableRow>
                    // )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const History = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cases, setCases] = useState([]);
  const [caseId, setCaseId] = useState("");
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/case/history`, {
        headers: {
          "x-user-id": localStorage.getItem("x-user-id"),
        },
      })
      .then((data) => {
        console.log(data);
        setCases(data?.data);
        // setCaseId(data?.data[0]?.id);
        // const casesWithId = data?.data.map((doc) => ({
        //   ...doc,
        //   id: doc.id,
        // }));
        // setCases(
        //   data?.data.map((doc) => ({
        //     ...doc,
        //     id: doc.id,
        //   }))
        // );
        // setCases(casesWithId);
        // setCaseId(data?.caseId);
      });
  }, []);

  const rows = cases?.map((doc) => {
    return {
      caseId: doc.caseId,
      // name: cases.name,
      uploadTime: doc.uploadTime,
      // status: cases.status,
      history: {
        drugAdministration: doc.drugAdministration,
        drugDetail: doc.drugDetail,
        note: doc.note,
        other: doc.other,
      },
      // history: doc.history.map((historyDoc) => ({
      //   ...historyDoc,
      //   id: doc.id, // here we are adding the document id to each history object
      // })),
    };
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <ResponsiveAppBar />
      <h1 className="App-main">ประวัติ</h1>
      <div className="App-search">
        <TextField id="outlined-search" label="Search ID" type="search" />
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: "lightgray" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ bgcolor: "#F3C6C6" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
            {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );

  // return (
  //   <><div className="App">
  //     <ResponsiveAppBar></ResponsiveAppBar>
  //     <h1 className="App-main">ประวัติ</h1>
  //   </div><div>
  //       <TableContainer>
  //         <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>รหัสเคส</TableCell>
  //               <TableCell align="right">สถานะ</TableCell>
  //               <TableCell align="right">วันที่อัปโหลด</TableCell>
  //               <TableCell align="right">ผลการวินิจฉัย</TableCell>
  //             </TableRow>
  //           </TableHead>
  //         </Table>
  //       </TableContainer>
  //     </div></>
  // );
};
export default History;
