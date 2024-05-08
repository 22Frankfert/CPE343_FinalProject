import React from "react";
import Grid from '@mui/material/Grid';


const SuggestionResult = () => {
  return(
    <div className="App">
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}
      <h1 className="App-result">แนะนำแนวทางการรักษา</h1>
        <Grid container wrap="nowwrap"
                      sx={{borderRadius:2, p:30}}
                      justifyContent="center"
                      alignItem="center"
                      bgcolor="#F3C6C6"
                      margin="auto"
                      display="block"
                      maxWidth="500"></Grid>
    </div>
  );
};
export default SuggestionResult;