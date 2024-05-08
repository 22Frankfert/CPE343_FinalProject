import React from "react";
import '../App.css'
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ResponsiveAppBar from "./appBar"
import Grid from '@mui/material/Grid';
// import AppBar from "@mui/material";
// import Toolbar from "@mui/material";
// import appBar from './appBar';
// import { Route, Routes, useNavigate } from "react-router-dom";
// import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import home_img from "../image/homepage_img.png"
import test1 from "../image/test1.png"
import test2 from "../image/test2.png"
import test3 from "../image/test3.png"
import styled from "styled-components";
import InfoSection from "./HomeSection";
import { homeObjOne } from "./HomeSection/data";
import Process from "./HomeProcess";


const theme = createTheme({
    typography: {
      fontFamily: [
        'Prompt',
      ].join(','),
    },});


    

const head_style = {
    width: '100%', 
    maxWidth: 600, 
    margin:10, 
    marginLeft:50,
    textAlign:"left",
    justifyContent:"right",
    
};

const info_style = {
    width: '100%',
    maxWidth: 600,
    textAlign:"left",
    
};

const screening_style = {
    justifyContent:"left",
    marginRight:60,
};

const diagnosis_style = {
    justifyContent:"center"
};

const optionOne = {
    
};

function Home() {
    return (
        <div className="App">
            

            <ResponsiveAppBar></ResponsiveAppBar>
            <InfoSection {...homeObjOne} />
            <Process/>
            {/* <ThemeProvider > */}

            {/* <h1 className="App-header">Web application development for patient screening and treatment suggestion in malaria</h1> */}
            {/* <Box sx={{flexDirection:"column", textAlign:"left",justifyContent:"right", maxWidth: 600,margin:10,}}>
                <Typography variant="h4" gutterBottom className="App-header"
                
                sx={{
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: '#CE3A50',
                    textDecoration: 'none',
                  }}>
                    Web application development for patient screening and treatment suggestion in malaria
                <Typography variant="subtitle1" gutterBottom className="App-text" sx={info_style}>
                เว็บแอปพลิเคชันนี้จัดทำขึ้นเพื่อคัดกรองประเภทของผู้ป่วยตามความรุนแรงของโรคและโอกาสในการเกิดภาวะแทรกซ้อน
                    สามารถทำนายผลชนิดของเชื้อมาลาเรียจากรูปฟิล์มเลือดบาง และสามารถแนะนำแนวทางการรักษาโรคมาลาเรียตามชนิดของเชื้อ
                    ความรุนแรงของโรค และโอกาสในการเกิดภาวะดื้อยาได้ โดยจะมีฟีเจอร์หลัก ๆ ให้สามารถใช้งานได้ดังนี้
                </Typography>
                </Typography>

                </Box> */}
                {/* <Grid
      
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(../image/test3.png)",
          // backgroundImage: "url(src/assets/images/Malarial-Parasite.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left",
          // borderRadius: "20px 0px 0px 20px",
        }}
      /> */}

                {/* <div className="home-img" style={{alignItems:"left"}}>
                <img src={test3} width="300"
                ></img> 
                </div> */}

            {/* <Box sx={screening_style}>
            <Grid
            container 
            sx={{borderRadius:2, p:4, width:300, height:300}}
            justifyContent="left"
            alignItem="left"
            bgcolor="#F3C6C6"
            margin="auto"
            display="flex"
            maxWidth="500">
                    <Typography
                    variant="h6"
                    fontFamily={Prompt}
                    sx={{
                        fontWeight: 700,
                        color: '#5B2F21',
                        
                      }}>
                    คัดกรองประเภทผู้ป่วยและแนะนำแนวทางการรักษา
                    </Typography>
                    <Button sx={{m:4,bgcolor:"#CE3A50"}} variant="contained" href="/PatientScreening">เริ่มการใช้งาน</Button>
            </Grid>
                </Box>

            <Box sx={diagnosis_style}>
            <Grid
            container 
            sx={{borderRadius:2, p:4, width:300, height:300,m:10}}
            // justifyContent="left"
            // alignItem="left"
            bgcolor="#F3C6C6"
            margin="auto"
            display="flex"
            maxWidth="500">
                    <Typography
                    variant="h6"
                    // fontFamily={Prompt}
                    sx={{
                        fontWeight: 700,
                        color: '#5B2F21',
                        
                      }}>
                    วินิจฉัยชนิดของเชื้อมาลาเรียด้วยฟิล์มเลือดบาง
                    </Typography>
                    <Button sx={{m:4,bgcolor:"#CE3A50"}} variant="contained" href="/DiagnosisFilm">เริ่มการใช้งาน</Button>
            </Grid>
                </Box>

            <Box sx={diagnosis_style}>
            <Grid
            container 
            sx={{borderRadius:2, p:4, width:300, height:300,m:10}}
            // justifyContent="left"
            // alignItem="left"
            bgcolor="#F3C6C6"
            margin="auto"
            display="flex"
            maxWidth="500">
                    <Typography
                    variant="h6"
                    // fontFamily={Prompt}
                    sx={{
                        // fontWeight: 700,
                        // color: '#5B2F21',
                        
                      }}>
                    ดำเนินการทุกขั้นตอน
                    </Typography>
                    <Button sx={{m:4,bgcolor:"#CE3A50"}} variant="contained" href="/AllProcess">เริ่มการใช้งาน</Button>
            </Grid>
                </Box> */}

                {/* </ThemeProvider> */}
                <div>
                
                    {/* <Link to="/">หน้าหลัก</Link> */}

                    {/* <Link to="/LogIn">เข้าสู่ระบบ</Link> */}
                
                    {/* <Link to="/Register">ลงทะเบียน</Link> */}
                
                    {/* <Link to="/HistoryTaking">ข้อมูลผู้ป่วย</Link> */}
                
                    {/* <Link to="/ConfirmInfo">ยืนยันผลการกรอกข้อมูลผู้ป่วย</Link> */}
                
                    {/* <Link to="/UploadFilm">อัปโหลดรูปฟิล์มเลือด</Link> */}
                
                    {/* <Link to="/Result">ผลการวินิจฉัย</Link> */}
                
                    {/* <Link to="/History">ประวัติ</Link> */}
                
                
                    {/* <Link to="/Profile">บัญชีผู้ใช้</Link> */}
                    <br></br>
                    {/* <Link to="/CaseID">CaseID</Link> */}
                    {/* <Link to="/Laboratory">การตรวจทางแลป</Link> */}
                </div>                

            
            {/* <div className="App-text">
                <Grid container wrap="nowwrap"
                    sx={{borderRadius:2, p:4}}
                    justifyContent="center"
                    alignItem="center"
                    bgcolor="#F3C6C6"
                    margin="auto"
                    display="block"
                    maxWidth="500">
                    {/* <p >เว็บแอปพลิเคชันนี้จัดทำขึ้นเพื่อคัดกรองประเภทของผู้ป่วยตามความรุนแรงของโรคและโอกาสในการเกิดภาวะแทรกซ้อน
                    สามารถทำนายผลชนิดของเชื้อมาลาเรียจากรูปฟิล์มเลือดบาง และสามารถแนะนำแนวทางการรักษาโรคมาลาเรียตามชนิดของเชื้อ
                    ความรุนแรงของโรค และโอกาสในการเกิดภาวะดื้อยาได้ โดยจะมีฟีเจอร์หลัก ๆ ให้สามารถใช้งานได้ดังนี้</p> */}
                    {/* <dd>*หากต้องการดำเนินการสำหรับผู้ป่วยใหม่โปรดเลือกวิธีการที่คุณต้องการใช้งานที่ปุ่มด้านล่าง*</dd> */}
                    {/* <dd>*หากต้องการดูข้อมูลหรือแก้ไขสำหรับผู้ป่วยที่เคยมีประวัติการใช้งานเว็บนี้แล้วโปรดไปยังหน้าประวัติ*</dd> */}
                    {/* <Button sx={{m:4,bgcolor:"#CE3A50"}} variant="contained" href="/PatientScreening">คัดกรองประเภทผู้ป่วยและแนะนำแนวทางการรักษา</Button> */}
                    {/* <Button sx={{m:4,bgcolor:"#CE3A50"}} variant="contained" href="/DiagnosisFilm">วินิจฉัยชนิดของเชื้อมาลาเรียด้วยฟิล์มเลือดบาง</Button> */}
                    {/* <Button sx={{m:4,bgcolor:"#CE3A50"}} variant="contained" href="/TreatmentSuggest">ทำนายวิธีการรักษา</Button> */}
                    {/* <Button sx={{m:4,bgcolor:"#CE3A50"}} variant="contained" href="/AllProcess">ดำเนินการทุกขั้นตอน</Button> */}
                {/* </Grid> */} 
                
            {/* </div> */}
                
        </div>
        
    );
}
export default Home;