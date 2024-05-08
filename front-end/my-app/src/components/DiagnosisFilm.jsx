import React from "react";
import ResponsiveAppBar from "./appBar"
import Stepper from '@mui/material/Stepper';
import { Button, Step, StepLabel } from "@mui/material";
import UploadFilm from "./UploadFilm";
import ConfirmBloodfilm from "./ConfirmBloodfilm"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StepButton from '@mui/material/StepButton';
import { useState } from 'react';
import { storage } from "../firebase";
import  {ref}  from 'firebase/storage';
import { uploadBytesResumable, getDownloadURL, uploadBytes} from "firebase/storage";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

// ผลการวินิจฉัยชนิดของเชื้อมาลาเรียจากฟิล์มเลือดบาง
const steps = ['อัปโหลดรูปฟิล์มเลือดบาง']

const DiagnosisBloodFilm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // const UploadFilm = () => {
  const [imgFile, setImgFile] = useState([]);
  const [percent, setPercent] = useState(0);

  const handleFileInputChange = (event) => {
    for (let i = 0; i < event.target.files.length; i++){
      setImgFile([...imgFile, ...Array.from(event.target.files)]);
    }}

      const handleUploadButtonClick = () => {
         if (imgFile.length >= 5 && imgFile.length <= 10) {
        const uploadFolder = Date.now().toString();
      imgFile.map((file) => {
        const storageRef = ref(storage, `/${uploadFolder}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imgFile);
    //     // promises.push(uploadTask)
        uploadTask.on(
          "state_changed",
          (snapshot) => {
          const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
            setPercent(percent);
          },
          (err) => console.log(err),
            () => {
     
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          alert("บันทึกข้อมูลเสร็จสิ้นโปรดกดปุ่มเสร็จสิ้นที่มุมขวาล่าง")
          });
          }
          );
      });
      setImgFile([]);
    setPercent(0);
    } else{
      alert("โปรดอัปโหลดรูปไม่ต่ำกว่า 5-10 รูป")
    }
    }
  // }

  // function stepContent(stepIndex){
  //   switch(stepIndex){
  //     case 0:
  //       return <UploadFilm/>;
  //     // case 1:
  //     //   return <ConfirmBloodfilm/>;
  //     default:
  //       return 'Unknown stepIndex';
  //   }
  // }
  
    return(

      <Box sx={{ width: "100%" }}>
      <ResponsiveAppBar/>
      {/* <Stepper sx={{m:10}} nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step  key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper> */}
      
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <ConfirmBloodfilm/>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography> */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <div>{stepContent(activeStep)}</div> */}

            <div className='App'>
      <div className='App-main'>
      <h1 className="App-result">อัปโหลดรูปฟิล์มเลือด</h1>
        <Grid container wrap="nowwrap"
          sx={{ borderRadius: 2, p: 20 }}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500">

          <IconButton color="#CE3A50" aria-label="upload picture" component="label">
            <input  multiple type="file" onChange={handleFileInputChange} />
            {/* <PhotoCamera /> */}
          </IconButton><br/>
          <Button sx={{bgcolor:"#CE3A50", m:2}} variant="contained" component="label" onClick={handleUploadButtonClick}>
            อัปโหลด
            
          </Button>

        </Grid>
      </div>
    </div>

            {/* <Typography sx={{ mt: 2, mb: 1, py: 1,position: "center" }}>
              Step {activeStep + 1}
            </Typography> */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {/* <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button> */}
              <Box sx={{ flex: "1 1 auto" }} />
              {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button> */}
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
      // <div className="App">
      //   <ResponsiveAppBar></ResponsiveAppBar>
      //   <h1>วินิจฉัยชนิดของเชื้อด้วยฟิล์มเลือดบาง</h1>
      //   <h2>ในขั้นตอนนี้จะทำการวินิจฉัยชนิดของเชื้อมาลาเรียที่ผู้ป่วยได้รับจากฟิล์มเลือดบางเท่านั้น</h2>
      //   <Stepper activeStep={1} alternativeLabel>
      //   <Step>
      //     <StepLabel>อัปโหลดรูปฟิล์มเลือดบาง</StepLabel>
      //     {/* <Button onClick={handle}></Button> */}
      //   </Step>

      //   <Step>
      //     <StepLabel>ผลการวินิจฉัยชนิดของเชื้อมาลาเรียจากฟิล์มเลือดบาง</StepLabel>
      //   </Step>
      // </Stepper>
      // </div>
    // );
};
export default DiagnosisBloodFilm;
