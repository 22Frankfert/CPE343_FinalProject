import React from "react";
import ResponsiveAppBar from "./appBar"
import Stepper from '@mui/material/Stepper';
import { Button, Step, StepLabel } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StepButton from '@mui/material/StepButton';
import SuggestionResult from "./SuggestionResult";
import SuggestionInfo from "./SuggestionInfo";


const steps = ['กรอกข้อมูลของผู้ป่วย','แนวทางการรักษา']

const TreatmentSuggestion = () => {
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
        return <SuggestionInfo/>;
      case 1:
        return <SuggestionResult/>;
      default:
        return 'Unknown stepIndex';
    }
  }
  
    return(

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
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
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
    //     <h1>ทำนายวิธีการใช้ยา</h1>
    //     <h2>ในขั้นตอนนี้หากทราบแล้วว่าผู้ป่วยติดเชื้อมาลาเรียชนิดใดและต้องการที่จะทราบแนวทางการรักษาให้กับผู้ป่วย</h2>
    //     <Stepper activeStep={1} alternativeLabel>
    //     <Step>
    //       <StepLabel>กรอกข้อมูลของผู้ป่วย</StepLabel>
          
    //     </Step>

    //     <Step>
    //       <StepLabel>แนวทางการรักษา</StepLabel>
    //     </Step>
    //   </Stepper>
    //   </div>
    // );
};
export default TreatmentSuggestion;