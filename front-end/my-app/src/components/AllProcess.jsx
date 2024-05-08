import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "./appBar";
import Stepper from "@mui/material/Stepper";
import { Button, Step, StepLabel } from "@mui/material";
import HistoryTaking from "./HistoryTaking";
import Laboratory from "./Laboratory";
import UploadFilm from "./UploadFilm";
import Result from "./Result";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StepButton from '@mui/material/StepButton';
import NewProcess from './newProcess'



// const steps = [
//   {
//     component: HistoryTaking,
//     title: "กรอกข้อมูลของผู้ป่วย",
//   },
// ข้อมูลจากผลการตรวจทางห้องปฏิบัติการ
//   {
//     component: UploadFilm,
//     title: "อัปโหลดรูปฟิล์มเลือดบาง",
//   },
//   {
//     component: Result,
//     title: "ผลการวินิจฉัยและแนวทางการรักษา",
//   },
// ];

const steps = ['กรอกข้อมูลของผู้ป่วย' , 'อัปโหลดรูปฟิล์มเลือดบาง']

const AllProcess = () => {
  
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

  function stepContent(stepIndex){
    switch(stepIndex){
      case 0:
        return <NewProcess/>;
      // case 1:
      //   return <Laboratory/>;
      case 1:
        return <UploadFilm/>;
      // case 3:
      //   return <Result/>;
      default:
        return 'Unknown stepIndex';
    }
  }
  
  return (
    <Box sx={{ width: "100%" }}>
      <ResponsiveAppBar/>
      <Stepper sx={{m:10}} nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Result/>
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
            <div>{stepContent(activeStep)}</div>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
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

  // return(
  //   <div className="App">
  //     <ResponsiveAppBar></ResponsiveAppBar>
  //     <h1>เริ่มการดำเนินงานทุกขั้นตอน</h1>
  //     <h2>การซักประวัติ ตรวจคัดกรอง</h2>
  //     <Stepper activeStep={state.activeStep}>
  //       {Tabs.map(({title})=>{
  //         return (
  //           <step key={title}>
  //             <StepLabel>{title}</StepLabel>
  //           </step>
  //         );
  //       })}
  //     </Stepper>
  //     {tab && <tab.component title={tab.title}/>}
  //   </div>
  // );
};
export default AllProcess;
