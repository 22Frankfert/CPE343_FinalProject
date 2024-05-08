import React from "react";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

const SuggestionInfo = () => {
  return (
    <div className="App">
      <h1 className="App-result">กรอกข้อมูลของผู้ป่วย</h1>
      <div className="App-LogIn">
        <Grid
          container
          wrap="nowwrap"
          sx={{ borderRadius: 2, p: 30 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500"
        >
          <TextField
            required
            id="outlined-required"
            label="กลุ่มคัดกรองประเภทของผู้ป่วย"
            sx={{ m: 4 }}
            variant="filled"
          ></TextField>
          <br></br>
          <TextField
            required
            id="outlined-required"
            label="ชนิดของเชื้อมาลาเรียที่ติด"
            sx={{ m: 4 }}
            variant="filled"
          ></TextField>
        </Grid>
      </div>
    </div>
  );
};
export default SuggestionInfo;
