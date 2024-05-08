import React from "react";
import ResponsiveAppBar from "./appBar";
import Stepper from "@mui/material/Stepper";
import { Button, Step, StepLabel } from "@mui/material";
import UploadFilm from "./UploadFilm";
import ConfirmBloodfilm from "./ConfirmBloodfilm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StepButton from "@mui/material/StepButton";
import { useState } from "react";
import { storage } from "../firebase";
import { ref } from "firebase/storage";
import {
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { AxiosResponse } from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { auth, logout, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where, doc } from "firebase/firestore";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import "react-circular-progressbar/dist/styles.css";
import CircularProgressWithLabel from "@mui/material/CircularProgress";

// ผลการวินิจฉัยชนิดของเชื้อมาลาเรียจากฟิล์มเลือดบาง
const steps = ["อัปโหลดรูปฟิล์มเลือดบาง"];

const DiagnosisBloodFilm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [user, loading, error] = useAuthState(auth);

  const userId = async () => {
    try {
      const q = query(collection(db, "user"), where("userId", "==", user?.uid));

      const documentSnapshot = await getDocs(q).then(
        (querySnapshot) => querySnapshot.docs[0]
      );
      const data = documentSnapshot.data();
      console.log("Document IDs:", documentSnapshot.id);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

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

  function CircularProgressWithLabel(props) {
    const { value, text, ...other } = props;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress variant="determinate" value={value} {...other} />
        <Typography variant="caption">{text}</Typography>
      </div>
    );
  }

  // const UploadFilm = () => {
  const [imgFile, setImgFile] = useState(null);
  const [percent, setPercent] = useState(0);
  const [caseId, setCaseId] = useState(null);

  const [loadingModal, setLoadingModal] = useState(false);
  const [textModal, setTextModal] = useState("");
  const [loadingIcon, setLoadingIcon] = useState(true);
  const [successIcon, setSuccessIcon] = useState(false);
  // const [errorIcon, setErrorIcon] = useState(false);
  // const [isMissingImage, setIsMissingImage] = useState(false);
  const [analysisModal, setAnalysisModal] = useState(false);
  const [errorIcon, setErrorIcon] = useState(false);
  const [runningModal, setRunningModal] = useState(false);
  const [style, setStyle] = useState({ opacity: 0, width: "0%" });

  const handleFileInputChange = (event) => {
    // for (let i = 0; i < event.target.files.length; i++) {
    //   setImgFile([...imgFile, ...Array.from(event.target.files)]);
    // }
    setImgFile(event.target.files);
    setCaseId(Date.now().toString());
  };

  const handleUploadButtonClick = () => {
    const formData = new FormData();
    for (let i = 0; i < imgFile.length; i++) {
      formData.append("originalImage", imgFile[i]);
    }
    formData.append("case_id", caseId);

    setLoadingModal(true); // set runningModal to true before starting the analysis

    const res = axios
      .post("http://127.0.0.1:8000/api/case/uploadonp", formData, {
        headers: {
          "x-user-id": localStorage.getItem("x-user-id"),
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPercent(percentCompleted);
        },
      })
      .then(() => {
        setLoadingModal(true);
        setTextModal("กำลังวิเคราะห์ผลอาจใช้เวลา 5-10 นาที กรุณารอสักครู่...");
        setLoadingIcon(true);

        axios
          .post("http://127.0.0.1:8000/api/case/testonp", { case_id: caseId })
          .then((res) => {
            // console.log(data);
            if (res.status === 201) {
              setLoadingIcon(false);
              setTextModal(
                "วิเคราะห์เสร็จสิ้น โปรดกดปุ่มเสร็จสิ้นที่มุมขวาล่าง"
              );
              setSuccessIcon(true);
              setTimeout(() => {
                const newStyle = {
                  opacity: 1,
                  transition: "width 1s ease-in-out",
                  width: "100%",
                };
                setSuccessIcon(false);
                setLoadingModal(false);
                setStyle(newStyle);
              }, 2000);
            }
          });
      });
  };

  console.log("loadingModal is:", loadingModal);

  return (
    <Box sx={{ width: "100%" }}>
      <ResponsiveAppBar />

      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <ConfirmBloodfilm case_id={caseId} />
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

            <div className="App">
              <div className="App-main">
                <h1 className="App-result">อัปโหลดรูปฟิล์มเลือด</h1>
                <Grid
                  container
                  wrap="nowwrap"
                  sx={{ borderRadius: 2, p: 20 }}
                  justifyContent="center"
                  alignItem="center"
                  bgcolor="#F3C6C6"
                  margin="auto"
                  display="block"
                  maxWidth="500"
                >
                  {/* <IconButton
                    color="#CE3A50"
                    aria-label="upload picture"
                    component="label"
                  > */}
                  <input
                    multiple
                    type="file"
                    onChange={handleFileInputChange}
                  />
                  {/* <PhotoCamera /> */}
                  {/* </IconButton> */}
                  <br />
                  <Button
                    sx={{ bgcolor: "#CE3A50", m: 2 }}
                    variant="contained"
                    component="label"
                    onClick={handleUploadButtonClick}
                  >
                    อัปโหลด
                  </Button>

                  {loadingModal && (
                    <div
                      style={{
                        position: "fixed",
                        top: "0px",
                        left: "0px",
                        zIndex: 99,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          position: "absolute",
                          zIndex: 10,
                          width: "350px",
                          height: "145px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            flexDirection: "column",
                            backgroundColor: "white",
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <span> {textModal && <div>{textModal}</div>}</span>

                          {loadingIcon && (
                            <CircularProgress
                              color="inherit"
                              sx={{ marginTop: "10px", fontSize: 40 }}
                              value={percent}
                              text={`${percent}%`}
                              // style={style}
                            />
                          )}
                          {successIcon && (
                            <CheckCircleOutlineIcon
                              color="success"
                              sx={{ marginTop: "10px", fontSize: 40 }}
                            />
                          )}
                          {errorIcon && (
                            <ErrorOutlineIcon
                              sx={{
                                color: "#e54059",
                                marginTop: "10px",
                                fontSize: 40,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <button onClick={() => setAnalysisModal(true)}>
                    Analysis
                  </button> */}

                  {/* Loading Modal */}
                  {/* {loadingModal && (
                    <div className="modal">
                      <div className="modal-content">
                        {loadingIcon && <p>Loading...</p>}
                        {successIcon && <p>Analysis complete!</p>}
                        <p>{textModal}</p>
                      </div>
                    </div>
                  )} */}

                  {/* Analysis Modal */}
                  {/* {analysisModal && (
                    <div className="modal">
                      <div className="modal-content">
                        <p>Analysis Modal</p>
                        <button onClick={onClickAnalysis}>
                          Start Analysis
                        </button>
                        <button onClick={() => setAnalysisModal(false)}>
                          Close
                        </button>
                      </div>
                    </div>
                  )} */}
                </Grid>
              </div>
            </div>

            {/* <Typography sx={{ mt: 2, mb: 1, py: 1, position: "center" }}>
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
};
export default DiagnosisBloodFilm;
