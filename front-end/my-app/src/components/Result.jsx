import React, {useState, useEffect} from "react";
// import ResponsiveAppBar from "./appBar"
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import testIMG from "../BloodfilmIMG.jpg"
import { TextField, Typography } from "@mui/material";
import { db } from "../firebase";
import { collection, addDoc, getDocs, QuerySnapshot } from "firebase/firestore";
import axios from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";







function Result() {
  const [result, setResult] = useState([]);
  // const currentCase = useAppSelector((state) => state.currentCase);
  // const caseId = currentCase.caseId;
  // const useAppSelector = useSelector;

  // useEffect(() => {
  //   const unsubscribe = getDocs(collection(db, "patient"))
  //     .onSnapshot((querySnapshot) => {
  //       const fetchedData = [];
  //       querySnapshot.forEach((doc) => {
  //         fetchedData.push({ id: doc.id, ...doc.result() });
  //       });
  //       setResult(fetchedData);
  //     });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const fetchPost = async () => {
    await getDocs (collection(db, "patient"))
    .then((querySnapshot)=>{
      // const newData = querySnapshot.docs.map((doc)=>({...doc.result(), id:doc.id}));
      // setResult(newData);
      // console.log(result, newData);
      const res = []
      querySnapshot.forEach((doc) => {
        res.push({ id: doc.id, ...doc.data() });
              });
              setResult(res);
    })
  }
  useEffect(()=>{
    fetchPost();
  },[]);

  return (
    <div className="App">
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}
      <h1 className="App-result">ผลการวินิจฉัย</h1>
      <div className="App-main">
        <TextField
required
defaultValue="Case ID"
id="outlined-read-only-input"
InputProps={{ readOnly: true }}
sx={{ m: 4 }}
/>
        <Grid container wrap="nowwrap"
                      sx={{borderRadius:2, p: 4,m:4}}
                      justifyContent="center"
                      alignItem="center"
                      bgcolor="#F3C6C6"
                      margin="auto"
                      display="block"
                      maxWidth="500">
                        
<img src={testIMG} width="300" justifyContent="left"></img>
        <Box >
            
{/* {result.map((drug_detail,i) => (
        <li key={drug_detail.id}>{drug_detail.name}</li>
      ))} */}
      

        <Typography>ผู้อัปโหลด:  </Typography>
        <Typography>สถานะการติดเชื้อ:  </Typography>
        <Typography>สปีชีส์ที่เป็นไปได้: </Typography>
        </Box>
        </Grid>
<Grid container wrap="nowwrap"
                      sx={{borderRadius:2, p: 4,m:4}}
                      justifyContent="center"
                      alignItem="center"
                      bgcolor="#F3C6C6"
                      margin="auto"
                      display="block"
                      maxWidth="500">
                        <Box>
          <h3>ผลการกรอกข้อมูลของผู้ป่วย</h3>
          <div className="App-info">
          {/* จากข้อมูลการซักประวัติและการตรวจทางห้องปฏิบัติการ<br/>
          ผู้ป่วย อายุ 7 ปี เพศหญิง น้ำหนัก 18 กิโลกรัม <br/>
          ติดเชื้อมาลาเรียชนิด <i>P.falciparum </i><br/>
          ซึ่งอยู่ในเกณฑ์ของผู้ป่วยที่มี ภาวะแทรกซ้อน/อาการรุนแรง <br/> */}
          <Typography>จากข้อมูลการซักประวัติและการตรวจทางห้องปฏิบัติการ</Typography>
          </div>
          </Box>
        </Grid>
        <Grid container wrap="nowwrap"
                      sx={{borderRadius:2, p: 4,m:4}}
                      justifyContent="center"
                      alignItem="center"
                      bgcolor="#F3C6C6"
                      margin="auto"
                      display="block"
                      maxWidth="500">
                        <Box>
          <h3>แนวทางการรักษา</h3>
          <div className="App-info">
          <br/>
          {result?.map((drug_detail,i)=>{
        <p key={i}>{drug_detail.drug_detail}</p>
      })}
      <Box>{result?.drug_administration}</Box>
          {/* <b>ยาขนานแรก</b>
          <br/>ครั้งที่ 1: ให้ Artesunate ขนาด 3 มก./กก. เข้าหลอดเลือดดำ เว้นเวลา 12 ชั่วโมง
          <br/>ครั้งที่ 2: ให้ Artesunate 2.4 มก./กก.เข้าหลอดเลือดดำ เว้นเวลา 24 ชั่วโมง
          <br/>ครั้งที่ 3: ให้ Artesunate 2.4 มก./กก.เข้าหลอดเลือดดำ วันละครั้งจนกว่าผู้ป่วยจะสามารถทานยาได้เอง
          <br/><b>หมายเหตุ:</b> เมื่อผู้ป่วยสามารถทานยาได้แล้ว จึงเปลี่ยนเป็นยา Artemisinin Combination Therapy และให้ยาตามกรณีผู้ป่วยสามารถรับประทานยาได้

          <br/><b>ยาขนานที่สอง</b>
          <br/>ครั้งที่ 1: ให้ Quinine Dihydrochloride ขนาด 20 มก./กก. ฉีดเข้าหลอดเลือดดำ เว้นเวลา 4 ชั่วโมง
          <br/>ครั้งที่ 2: ให้ Quinine Dihydrochloride ขนาด 10 มก./กก. ฉีดเข้าหลอดเลือดดำใน 2-4 ชั่วโมง เว้นเวลา 8 ชั่วโมง
          <br/>ครั้งที่ 3: ให้ Quinine Dihydrochloride ขนาด 10 มก./กก. ฉีดเข้าหลอดเลือดดำ เว้นเวลา 8 ชั่วโมงจนกว่าผู้ป่วยจะสามารถทานยาได้เอง
          <br/><b>หมายเหตุ:</b> เมื่อผู้ป่วยสามารถทานยาได้แล้ว จึงเปลี่ยนเป็นยา Artemisinin Combination Therapy และให้ยาตามกรณีผู้ป่วยสามารถรับประทานยาได้

          <br/><b>กรณีผู้ป่วยสามารถรับประทานยาได้</b>
          <br/>วันที่ 0: ให้ยา Artemisinin Combination Therapy ชนิดรับประทาน
          <br/>วันที่ 1: ให้ยา Artemisinin Combination Therapy ชนิดรับประทาน
          <br/>วันที่ 2: ให้ยา Artemisinin Combination Therapy ชนิดรับประทาน

          <br/><b>หรือ</b>
          <br/>วันที่ 0: ให้ยา Quinine ร่วมกับ Clindamycin หรือ Artesunate ร่วมกับ Clindamycin ชนิด
          <br/>รับประทาน
          <br/>วันที่ 1: ให้ยา Quinine ร่วมกับ Clindamycin หรือ Artesunate ร่วมกับ Clindamycin ชนิด
          <br/>รับประทาน
          <br/>วันที่ 2: ให้ยา Quinine ร่วมกับ Clindamycin หรือ Artesunate ร่วมกับ Clindamycin ชนิด
          <br/>รับประทาน
          <br/><b>หมายเหตุ:</b> วันที่ 3-วันที่ 6 ให้ยาเหมือนกับวันที่ 0 

          <br/><b>กรณีการรักษาล้มเหลว</b>
          <br/>หลังจากให้การรักษาด้วยยาตามสูตรต่าง ๆ แล้ว
          <br/>ตรวจพบข้อใดข้อหนึ่ง ต่อไปนี้
          <br/>- มีอาการทางคลินิกเลวลงในวันใดก็ตามและตรวจพบเชื้อชนิดเดิมซ้ำในฟิล์มเลือด
          <br/>- มีอาการ/อาการแสดงกลับซ้ำขึ้นมาใหม่แต่อาการไม่รุนแรง
          <br/>- ไม่มีอาการ/อาการแสดงแล้ว แต่ตรวจพบเชื้อชนิดเดิมซ้ำในฟิล์มเลือด
          <br/>ภายในวันที่ 28 หลังเริ่มได้ยา
          <br/>ให้รักษาโดยการใช้ยาขนานที่สอง และส่งต่อผู้ป่วยกลุ่มนี้ไปรับการรักษาที่โรงพยาบาล */}
          </div>
        </Box>

                      </Grid>
                      </div>
    </div>
  );
}
export default Result;
