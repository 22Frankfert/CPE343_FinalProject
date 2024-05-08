import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Checkbox, InputLabel } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
// import ResponsiveAppBar from "./appBar"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { async } from "@firebase/util";
import { useState } from "react";
import {Button,Grid} from "@mui/material";



const patient = document.getElementById("patient")


function Laboratory() {

  const [anemia, setAnemia] = useState("");
  const [kidney_failure, setKidney_failure] = useState("");
  const [malaria_type, setMalaria_type] = useState("");
  const [malaria_amount, setMalaria_amount] = useState("");
  const [blood_sugar, setBlood_sugar] = useState("");
  const [acidosis, setAcidosis] = useState("",'');
  const [pulmonary_edema, setPulmonary_edema] = useState("");
  const [jaundice, setJaundice] = useState("");

  const addPatient = async (e) => {
    e.preventDefault();

    try {
        const docRef = await addDoc(collection(db,"patient"),{
          anemia: anemia,
          kidney_failure:kidney_failure,
          malaria_type:malaria_type,
          malaria_amount:malaria_amount,
          blood_sugar:blood_sugar,
          acidosis:acidosis,
          pulmonary_edema:pulmonary_edema,
          jaundice:jaundice,
        })
        console.log("Document written with ID:", docRef.id);
    } catch(e){
        console.error("Error adding document",e);
    }
};

  return (
    <div className="App">
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}
      <h2 className="App-result">ข้อมูลจากผลการตรวจทางห้องปฏิบัติการ</h2>
      <TextField
        required
        defaultValue="Case ID"
        id="caseID"
        InputProps={{ readOnly: true }}
        sx={{ m: 4 }}
      />
      <div className="App-info">
      <Grid
          container
          sx={{ borderRadius: 2,p:6}}
          justifyContent="center"
          alignItem="center"
          bgcolor="#F3C6C6"
          margin="auto"
          display="block"
          maxWidth="500"
        >
        <FormControl sx={{ m: 2 }}>
          <FormLabel id="anemia">พบภาวะซีดหรือไม่</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="yes"
            name="anemia"
            onChange={(e) => setAnemia(e.target.value)}
          >
            <FormControlLabel value="ใช่" control={<Radio />} label="ใช่" />

            <FormControlLabel
              sx={{ ml: 2 }}
              value="ความเข้มข้นฮีโมโกลบินน้อยกว่าหรือเท่ากับ 5 g/dL หรือ ระดับฮีมาโตคริตน้อยกว่าหรือเท่ากับ 15%"
              control={<Radio />}
              label="ความเข้มข้นฮีโมโกลบินน้อยกว่าหรือเท่ากับ 5 g/dL หรือ ระดับฮีมาโตคริตน้อยกว่าหรือเท่ากับ 15%"
            ></FormControlLabel>
            <FormControlLabel
              sx={{ ml: 2 }}
              value="ความเข้มข้นฮีโมโกลบินน้อยกว่าหรือเท่ากับ 7 g/dL หรือระดับฮีมาโตคริตน้อยกว่า 20% ร่วมกับจำนวนเชื้อมาลาเรียในเลือดมากกว่า 100,000/ µl"
              control={<Radio />}
              label="ความเข้มข้นฮีโมโกลบินน้อยกว่าหรือเท่ากับ 7 g/dL หรือระดับฮีมาโตคริตน้อยกว่า 20% ร่วมกับจำนวนเชื้อมาลาเรียในเลือดมากกว่า 100,000/ µl"
            ></FormControlLabel>

            <FormControlLabel value="ไม่ใช่" control={<Radio />} label="ไม่ใช่" />
          </RadioGroup>
        </FormControl>
        <br></br>

        <FormControl sx={{ m: 2 }}>
          <FormLabel id="kidney_failure">
            พบภาวะไตวายหรือไม่
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="kidney1"
            name="kidney_failure"
            onChange={(e) => setKidney_failure(e.target.value)}
          >
            <FormControlLabel
              value="มีค่า Blood Urea Nitrogen(BUN) มากกว่า 20 mmol/L"
              control={<Checkbox />}
              label="มีค่า Blood Urea Nitrogen(BUN) มากกว่า 20 mmol/L"
            />
            <FormControlLabel
              value="มีค่า Creatinine มากกว่า 265 µmol/L (3 mg/dL)"
              control={<Checkbox />}
              label="มีค่า Creatinine มากกว่า 265 µmol/L (3 mg/dL)"
            />
            <FormControlLabel
              value="ไม่มีอาการดังกล่าว"
              control={<Radio />}
              label="ไม่มีอาการดังกล่าว"
            />
          </RadioGroup>
        </FormControl>
        <br></br>

        <FormControl sx={{ m: 2 }}>
          <FormLabel id="malaria_type">
            ชนิดของเชื้อมาลาเรียที่ตรวจพบ ณ ปัจจุบัน
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="malaria_type1"
            name="malaria_type"
            onChange={(e) => setMalaria_type(e.target.value)}
          >
            <FormControlLabel
              value="P. falciparum"
              control={<Checkbox />}
              label="P. falciparum"
            />
            <FormControlLabel
              value="P. vivax"
              control={<Checkbox />}
              label="P. vivax"
            />
            <FormControlLabel
              value="P. malariae"
              control={<Checkbox />}
              label="P. malariae"
            />
            <FormControlLabel
              value="P. ovale"
              control={<Checkbox />}
              label="P. ovale"
            />
            <FormControlLabel
              value="P. knowlesi"
              control={<Checkbox />}
              label="P. knowlesi"
            />
            <FormControlLabel
              value="ไม่พบเชื้อ"
              control={<Radio />}
              label="ไม่พบเชื้อ"
            />
            <FormControlLabel
              value="ยังไม่ทราบชนิดของเชื้อ"
              control={<Radio />}
              label="ยังไม่ทราบชนิดของเชื้อ"
            />
          </RadioGroup>
        </FormControl>
        <br />

        <FormControl sx={{ m: 2 }}>
          <FormLabel id="malaria_amount">
            จำนวนเชื้อมาลาเรียในเลือด
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="malariaAmount1"
            name="malaria_amount"
            onChange={(e) => setMalaria_amount(e.target.value)}
          >
            <FormControlLabel
              value="มากกว่า 1,250 ตัวต่อเม็ดเลือดขาว 100 ตัว"
              control={<Checkbox />}
              label="มากกว่า 1,250 ตัวต่อเม็ดเลือดขาว 100 ตัว"
            />
            <FormControlLabel
              value="มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา"
              control={<Checkbox />}
              label="มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา"
            />
            <FormControlLabel
              value="พบเชื้อระยะแบ่งตัว"
              control={<Checkbox />}
              label="พบเชื้อระยะแบ่งตัว"
            />
            <FormControlLabel
              value="จำนวนเชื้อมาลาเรียในเลือดมากกว่าร้อยละ 10"
              control={<Checkbox />}
              label="จำนวนเชื้อมาลาเรียในเลือดมากกว่าร้อยละ 10"
            />
            <FormControlLabel
              value="ไม่พบตามที่กล่าวมา"
              control={<Radio />}
              label="ไม่พบตามที่กล่าวมา"
            />
          </RadioGroup>
        </FormControl>
        <br></br>

        <FormControl sx={{ m: 2 }}>
          <FormLabel id="blood_sugar">
            ระดับน้ำตาลในเลือด
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="bloodSugar1"
            name="blood_sugar"
            onChange={(e) => setBlood_sugar(e.target.value)}
          >
            <FormControlLabel
              value="น้อยกว่า 2.2 mmol/L"
              control={<Radio />}
              label="น้อยกว่า 2.2 mmol/L"
            />
            <FormControlLabel
              value="มากกว่า 2.2 mmol/L"
              control={<Radio />}
              label="มากกว่า 2.2 mmol/L"
            />
            <FormControlLabel
              value="ไม่พบตามที่กล่าวมา"
              control={<Radio />}
              label="ไม่พบตามที่กล่าวมา"
            />
          </RadioGroup>
        </FormControl>
        <br></br>

        <FormControl sx={{ m: 2 }}>
          <FormLabel id="acidosis">
            พบภาวะเลือดเป็นกรดหรือไม่
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="acidosis1"
            name="acidosis"
            onChange={(e) => setAcidosis(e.target.value)}
          >
            <FormControlLabel
              value="ระดับแลคเตทมากกว่าหรือเท่ากับ 5 mmol/L"
              control={<Checkbox />}
              label="ระดับแลคเตทมากกว่าหรือเท่ากับ 5 mmol/L"
            />
            <FormControlLabel
              value="ระดับ Bicarbonate น้อยกว่า 15 mmol/L"
              control={<Checkbox />}
              label="ระดับ Bicarbonate น้อยกว่า 15 mmol/L"
            />
            <FormControlLabel
              value="ไม่พบตามที่กล่าวมา"
              control={<Checkbox />}
              label="ไม่พบตามที่กล่าวมา"
            />
          </RadioGroup>
        </FormControl>
        <br></br>

        <FormControl sx={{ m: 2 }}>
          <FormLabel id="pulmonary_edema">
            พบภาวะน้ำท่วมปอดหรือไม่
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="pulmonary_edema1"
            name="pulmonary_edema"
            onChange={(e) => setPulmonary_edema(e.target.value)}
          >
            <FormControlLabel
              value="พบ"
              control={<Radio />}
              label="พบ"
            />

            <FormControlLabel
              sx={{ ml: 2 }}
              value="จากการฟัง"
              control={<Checkbox />}
              label="จากการฟัง"
            ></FormControlLabel>
            <FormControlLabel
              sx={{ ml: 2 }}
              value="จากการ X-Ray"
              control={<Checkbox />}
              label="จากการ X-Ray"
            ></FormControlLabel>

            <FormControlLabel
              value="ไม่พบ"
              control={<Radio />}
              label="ไม่พบ"
            />
          </RadioGroup>
        </FormControl>

        <br></br>

        <FormControl sx={{ m: 2 }}>
          <FormLabel id="jaundice">
            พบอาการตัวเหลืองตาเหลืองหรือไม่
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="jaundice1"
            name="jaundice"
            onChange={(e) => setJaundice(e.target.value)}
          >
            <FormControlLabel
              value="พบ"
              control={<Radio />}
              label="พบ"
            />

            <FormControlLabel
              sx={{ ml: 2 }}
              value="Bilirubin มากกว่า 3 mg/dL"
              control={<Radio />}
              label="Bilirubin มากกว่า 3 mg/dL"
            ></FormControlLabel>

            <FormControlLabel
              value="ไม่พบ"
              control={<Radio />}
              label="ไม่พบ"
            />
          </RadioGroup>
        </FormControl><br/>
        <Button
              sx={{ bgcolor: "#CE3A50" }}
              type="submit"
              onClick={addPatient}

              variant="contained"
            >save</Button>
            </Grid>
      </div>
    </div>
  );
}
export default Laboratory;
