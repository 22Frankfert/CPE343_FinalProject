import React from "react";
import "../App.css";
import ResponsiveAppBar from "./appBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InfoSection from "./HomeSection";
import { homeObjOne } from "./HomeSection/data";
import Process from "./HomeProcess";

const theme = createTheme({
  typography: {
    fontFamily: ["Prompt"].join(","),
  },
});

const head_style = {
  width: "100%",
  maxWidth: 600,
  margin: 10,
  marginLeft: 50,
  textAlign: "left",
  justifyContent: "right",
};

const info_style = {
  width: "100%",
  maxWidth: 600,
  textAlign: "left",
};

const screening_style = {
  justifyContent: "left",
  marginRight: 60,
};

const diagnosis_style = {
  justifyContent: "center",
};

const optionOne = {};

function Home() {
  return (
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <InfoSection {...homeObjOne} />
      <Process />
    </div>
  );
}
export default Home;
