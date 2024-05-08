import React from "react";
import Stepper from '@mui/material/Stepper';
import { Button, Step, StepLabel } from "@mui/material";
import ResponsiveAppBar from "./appBar"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StepButton from '@mui/material/StepButton';
import HistoryTaking from "./HistoryTaking";
import ConfirmInfo from "./ConfirmInfo";
import Laboratory from "./Laboratory";
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import addPatient from './HistoryTaking'
import NewProcess from "./newProcess";




// const ScreeningSteps = [
//   'กรอกข้อมูลของผู้ป่วย',
//   'ยืนยันผลการกรอกข้อมูล',
//   'ผลการคัดกรองประเภทของผู้ป่วยและแนะนำแนวทางการรักษา'
// ];

// export default function PatientScreeningSteps(){
//   return(

//   );
// }
//ข้อมูลจากผลการตรวจทางห้องปฏิบัติการ

const steps = ['ข้อมูลการซักประวัติ']

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const PatientScreening = () => {
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
      // case 2:
      //   return <ConfirmInfo/>;
      default:
        return 'Unknown stepIndex';
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
    return(

      <Box sx={{ width: "100%" }}>
      <ResponsiveAppBar/>
      {/* <Stepper sx={{m:10}} nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper> */}
      
      <div style={{marginTop:20}}>
        {allStepsCompleted() ? (
          <React.Fragment>
            <ConfirmInfo/>
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
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
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
            {/* <Button
              sx={{ bgcolor: "#CE3A50", m:10 }}
              type="submit"
              onClick={addPatient}
              value="save"
              variant="contained"
            >save</Button> */}
          </React.Fragment>
        )}
      </div>
    </Box>
    
  );
  // return (
  //   <div className="App">
  //     <ResponsiveAppBar></ResponsiveAppBar>
  //     <h1 className="App-header">คัดแยกประเภทผู้ป่วย</h1>
  //     <h2 className="Element">ในขั้นตอนนี้จะทำการคัดกรองผู้ป่วยตามความรุนแรงและโอกาสในการเกิดภาวะแทรกซ้อนของโรคมาลาเรียเท่านั้น</h2>
  //     <Stepper activeStep={1} alternativeLabel>
  //       <Step>
  //         <StepLabel>กรอกข้อมูลของผู้ป่วย</StepLabel>
  //         {/* <Button onClick={handle}></Button> */}
  //       </Step>

  //       <Step>
  //         <StepLabel>ยืนยันผลการกรอกข้อมูล</StepLabel>
  //       </Step>
  //       <Step>
  //         <StepLabel>ผลการคัดกรองประเภทของผู้ป่วย</StepLabel>
  //       </Step>
  //     </Stepper>
  //   </div>
  // );
}
export default PatientScreening;
