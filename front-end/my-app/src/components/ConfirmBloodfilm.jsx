import React from "react";
// import ResponsiveAppBar from "./appBar"
import Grid from '@mui/material/Grid';
import testIMG from "../BloodfilmIMG.jpg"
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";



function ConfirmBloodfilm() {
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
                      sx={{borderRadius:2, p:10}}
                      justifyContent="center"
                      alignItem="center"
                      bgcolor="#F3C6C6"
                      margin="auto"
                      display="block"
                      maxWidth="500">
<img src={testIMG} width="300" justifyContent="left" ></img>
        <Box sx={{justifyContent:"right"}}>
            
        <Typography>ผู้อัปโหลด: ชื่อ นามสกุล </Typography>
        <Typography>สถานะการติดเชื้อ: ติดเชื้อ </Typography>
        <Typography>สปีชีส์ที่เป็นไปได้: <i>P.falciparum</i>  </Typography>
        </Box>
                      </Grid>
                      </div>
    </div>
  );
}
export default ConfirmBloodfilm;