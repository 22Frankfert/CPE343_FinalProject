import React from "react";
import { ProcessContainer, ProcessH1, ProcessWrapper, ProcessCard, ProcessH2, ProcessP } from "./ProcessElements";
import { Button } from "@mui/material";


const Process = () => {
    return (
        <ProcessContainer id="process">
            <ProcessH1>
                <ProcessWrapper>
                    <ProcessCard >
                        <ProcessH2>คัดกรองประเภทผู้ป่วยและแนะนำแนวทางการรักษา</ProcessH2>
                        <ProcessP>ในขั้นตอนนี้ผู้ใช้งานจะต้องกรอกข้อมูลการซักประวัติและผลตรวจทางห้องปฏิบัติการเพื่อประกอบการคัดกรองสำหรับจำแนกประเภทของผู้ป่วยและแนะนำแนวทางการรักษา</ProcessP>
                        <Button sx={{m:4,bgcolor:"#CE3A50"}} variant="contained" href="/PatientScreening">เริ่มการใช้งาน</Button>
                    </ProcessCard>

                    <ProcessCard >
                        <ProcessH2>วินิจฉัยชนิดของเชื้อมาลาเรียด้วยฟิล์มเลือดบาง</ProcessH2>
                        <ProcessP>ในขั้นตอนนี้ผู้ใช้งานจะต้องอัปโหลดรูปฟิล์มเลือดบางจำนวนไม่ต่ำกว่า 5  รูป และไม่เกิน 10 รูป เพื่อประกอบการวินิจฉัยชนิดของเชื้อมาลาเรียที่ผู้ป่วยมีโอกาสติด</ProcessP>
                        <Button sx={{m:4,bgcolor:"#CE3A50"}} variant="contained" href="/DiagnosisFilm">เริ่มการใช้งาน</Button>
                    </ProcessCard>

                    <ProcessCard>
                        <ProcessH2>ดำเนินการทุกขั้นตอน</ProcessH2>
                        <ProcessP>ในขั้นตอนนี้ผู้ใช้งานจะต้องกรอกข้อมูลจากการซักประวัติและตรวจร่างกาย อัปโหลดรูปฟิล์มเลือดบางเพื่อประกอบการวิเคราะห์ประเภทของผู้ป่วย เชื้อมาลาเรียที่ติด และแนะนำแนวทางการรักษา</ProcessP>
                        <Button sx={{m:4,bgcolor:"#CE3A50"}} variant="contained" href="/AllProcess">เริ่มการใช้งาน</Button>
                    </ProcessCard>

                </ProcessWrapper>
            </ProcessH1>
        </ProcessContainer>
    )
}

export default Process;
