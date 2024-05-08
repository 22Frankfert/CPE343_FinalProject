import React, { useState, useEffect } from "react";
// import ResponsiveAppBar from "./appBar"
import Grid from "@mui/material/Grid";
import testIMG from "../BloodfilmIMG.jpg";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

function ConfirmBloodfilm({ case_id }) {
  const [cases, setCases] = useState([]);
  console.log(case_id);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/case/imgresult/${case_id}`)
      .then((res) => {
        console.log(res);
        setCases(res.data);
      });
  }, []);
  return (
    <div className="App">
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}
      <h1 className="App-result">ผลการวินิจฉัย</h1>
      <div className="App-main">
        <TextField
          required
          defaultValue={case_id}
          id="outlined-read-only-input"
          InputProps={{ readOnly: true }}
          sx={{ m: 4 }}
        />
        <Grid
          container
          wrap="nowwrap"
          sx={{ borderRadius: 2, p: 10 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500"
        >
          <img src={testIMG} width="300" justifyContent="left"></img>
          <Box sx={{ justifyContent: "right" }}>
            {cases && cases.map((show, i) => <div key={i}></div>)}
            {/* <Typography>ผู้อัปโหลด: ชื่อ นามสกุล </Typography> */}
            <Typography>สถานะการติดเชื้อ: {cases[7]} </Typography>
            <Typography>
              <i>P.falciparum: </i> {cases[0]}{" "}
            </Typography>
            <Typography>
              <i>P.knowlesi: </i> {cases[1]}{" "}
            </Typography>
            <Typography>
              <i>P.malariae: </i> {cases[2]}{" "}
            </Typography>
            <Typography>
              <i>P.ovale: </i> {cases[3]}{" "}
            </Typography>
            <Typography>
              <i>P.vivax: </i> {cases[4]}{" "}
            </Typography>
            <Typography>
              สปีชีส์ที่เป็นไปได้: <i>P. </i>
              <i>{cases[6]}</i>{" "}
            </Typography>
          </Box>
        </Grid>
      </div>
    </div>
  );
}
export default ConfirmBloodfilm;
