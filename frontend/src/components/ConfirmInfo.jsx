// import React from "react";
import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";

const ConfirmInfo = ({ case_id }) => {
  const [result, setResult] = useState([]);
  const [cases, setCases] = useState([]);
  console.log(case_id);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/case/recresult/${case_id}`)
      .then((data) => {
        console.log(data);
        setCases(data?.data);
      });
  }, []);
  return (
    <div className="App">
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}
      <h1 className="App-result">
        ผลการคัดกรองประเภทของผู้ป่วยและแนะนำแนวทางการรักษา
      </h1>
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
          sx={{ borderRadius: 2, p: 6, m: 2 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          display="block"
          maxWidth="500"
        >
          <Box>
            <h3>ผลการกรอกข้อมูลของผู้ป่วย</h3>
            <div className="App-info">
              จากข้อมูลการซักประวัติและการตรวจทางห้องปฏิบัติการ
              <br />
              {cases?.map((show, i) => (
                <div key={i}></div>
              ))}
              <b>ผู้ป่วยติดเชื้อมาลาเรียชนิด</b> <i>{cases[0]}</i>
              <br />
              <br />
              <b>อยู่ในเกณฑ์</b> {cases[1]} <br />
              <br />
            </div>
          </Box>
        </Grid>

        <Grid
          container
          wrap="nowwrap"
          sx={{ borderRadius: 2, p: 4, m: 2 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          display="block"
          maxWidth="500"
        >
          <Box>
            <h3>แนวทางการรักษา</h3>
            <div className="App-info">
              <b>ยาที่ใช้</b> <br />
              {cases[2]} <br />
              <br />
              <b>การบริหารยา</b> <br />
              {cases[3]} <br />
              <br />
              <b>หมายเหตุ:</b> {cases[4]} <br />
              <br />
              <b>คำแนะนำอื่น ๆ เพิ่มเติม</b> <br /> {cases[5]} <br />
            </div>
          </Box>
        </Grid>
      </div>
    </div>
  );
};
export default ConfirmInfo;
