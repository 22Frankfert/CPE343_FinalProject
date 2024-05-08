import React, { useState, useEffect } from "react";
// import ResponsiveAppBar from "./appBar"
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import testIMG from "../BloodfilmIMG.jpg";
import { TextField, Typography } from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";
// import {docRef} from NewProcess

function Result({ case_id }) {
  const [result, setResult] = useState([]);
  const [cases, setCases] = useState([]);
  console.log(case_id);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/case/result/${case_id}`)
      .then((data) => {
        console.log(data);
        setCases(data?.data);
      });
  }, []);

  const fetchPost = async () => {
    await getDocs(collection(db, "patient")).then((querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push({ id: doc.id, ...doc.data() });
      });
      setResult(res);
    });
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="App">
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
          sx={{ borderRadius: 2, p: 4, m: 4 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500"
        >
          <img src={testIMG} width="300" justifyContent="left"></img>
          <Box>
            {/* <Typography>ผู้อัปโหลด: </Typography> */}
            <Typography>สถานะการติดเชื้อ: {cases[13]} </Typography>
            <Typography>
              <i>P.falciparum: </i> {cases[6]}{" "}
            </Typography>
            <Typography>
              <i>P.knowlesi: </i> {cases[7]}{" "}
            </Typography>
            <Typography>
              <i>P.malariae: </i> {cases[8]}{" "}
            </Typography>
            <Typography>
              <i>P.ovale: </i> {cases[9]}{" "}
            </Typography>
            <Typography>
              <i>P.vivax: </i> {cases[10]}{" "}
            </Typography>
            <Typography>
              สปีชีส์ที่เป็นไปได้: <i>P. </i>
              <i>{cases[12]}</i>{" "}
            </Typography>
          </Box>
        </Grid>
        <Grid
          container
          wrap="nowwrap"
          sx={{ borderRadius: 2, p: 4, m: 4 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500"
        >
          <Box>
            <h3>ผลการกรอกข้อมูลของผู้ป่วย</h3>
            <div className="App-info">
              <Typography>
                จากข้อมูลการซักประวัติและการตรวจทางห้องปฏิบัติการ
              </Typography>
              <br />
              {cases?.map((show, i) => (
                <div key={i}></div>
              ))}
              <b>ผู้ป่วยติดเชื้อมาลาเรียชนิด</b> <i>{cases[0]}</i>
              <br />
              <br />
              <b>อยู่ในเกณฑ์</b> {cases[1]}
              <br />
              <br />
              <b>การดื้อยา: </b> {cases[14]}
            </div>
          </Box>
        </Grid>
        <Grid
          container
          wrap="nowwrap"
          sx={{ borderRadius: 2, p: 4, m: 4 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500"
        >
          <Box>
            <h3>แนวทางการรักษา</h3>
            <div className="App-info">
              <br />
              {result?.map((drug_detail, i) => {
                <p key={i}>{drug_detail.drug_detail}</p>;
              })}
              <b>ยาที่ใช้</b> <br />
              {cases[2]} <br />
              <br />
              <b>การบริหารยา</b> <br />
              {cases[3]} <br />
              <br />
              <b>คำแนะนำอื่น ๆ เพิ่มเติม</b>
              <br /> {cases[5]} <br />
              <br />
              <b>หมายเหตุ:</b> {cases[4]} <br />
              <br />
              <Box>{result?.drug_administration}</Box>
            </div>
          </Box>
        </Grid>
      </div>
    </div>
  );
}
export default Result;
