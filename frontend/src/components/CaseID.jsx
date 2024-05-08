//generate case id
//input existing case id

import { Button, TextField } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "./appBar"
// import { render } from "react-dom";
import { useId } from 'react';
import Grid from '@mui/material/Grid';


const CaseID = () => {
    const GenerateID = useId()
    return(
        <div className="App">
            <h1 className="App-header">
            Web application development for patient screening and treatment suggestion in malaria
            </h1>
            <div className="App-LogIn">
                <Grid container wrap="nowwrap"
                        sx={{borderRadius:2}}
                        justifyContent="center"
                        alignItem="center"
                        bgcolor="#F3C6C6"
                        margin="auto"
                        display="block"
                        maxWidth="500">
                    <h2 >รหัสเคส</h2>
                    
                    <Button variant="contained" sx={{m:4}}>ผู้ป่วยใหม่</Button>
                    <p id="GenerateID"></p>
                    <GenerateID></GenerateID>
                    <Button variant="contained" sx={{m:4}} href="/History">ผู้ป่วยเก่า</Button><br/>
                    {/* <TextField displayed label="โปรดระบุรหัสเคส"></TextField> */}
                    <Button sx={{m:4}} variant="contained" href="/">ต่อไป</Button>
                    
                </Grid>
            </div>
        </div>
    )

}

export default CaseID;