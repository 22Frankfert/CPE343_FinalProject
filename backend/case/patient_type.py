import pandas as pd


def patientType(pt):
    if (pt['age'] < float(12) and ("ความเข้มข้นฮีโมโกลบินน้อยกว่าหรือเท่ากับ 5 g/dL หรือ ระดับฮีมาโตคริตน้อยกว่าหรือเท่ากับ 15%" in pt['anemia'])) or (pt['age'] >= float(12) and ("ความเข้มข้นฮีโมโกลบินน้อยกว่าหรือเท่ากับ 7 g/dL หรือระดับฮีมาโตคริตน้อยกว่า 20% ร่วมกับจำนวนเชื้อมาลาเรียในเลือดมากกว่า 100,000/ µl" in pt['anemia'])):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    if ("ปัสสาวะออกน้อยกว่า 400 ml/วัน" in pt['urine_amount']) or ("ไม่มีปัสสาวะภายใน 4 ชั่วโมง" in pt['urine_amount']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("ใช่" in pt['urine_color']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("ใช่" in pt['bleeding']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("ใช่" in pt['fatigue']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("ใช่" in pt['convulsions']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("ใช่" in pt['comatose']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("มีการหายใจมากกว่า 30 ครั้งต่อนาที" in pt['asthma']) and ("มีค่า Oxygen Saturation น้อยกว่า 92%" in pt['asthma']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("มีค่า Blood Urea Nitrogen(BUN) มากกว่า 20 mmol/L" in pt['kidney_failure']) or ("มีค่า Creatinine มากกว่า 265 µmol/L (3 mg/dL)" in pt['kidney_failure']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("น้อยกว่า 2.2 mmol/L" in pt['blood_sugar']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("ระดับแลคเตทมากกว่าหรือเท่ากับ 5 mmol/L" in pt['acidosis']) or ("ระดับ Bicarbonate น้อยกว่า 15 mmol/L" in pt['acidosis']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("พบ" in pt['pulmonary_edema']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("จากการ X-Ray" in pt['pulmonary_edema']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("Bilirubin มากกว่า 3 mg/dL" in pt['jaundice']) and ("มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา" in pt['malaria_amount']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif ("จำนวนเชื้อมาลาเรียในเลือดมากกว่าร้อยละ 10" in pt['malaria_amount']):
        pt['patient_type'] = 'ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง'
    elif pt['age'] < 1:
        pt['patient_type'] = 'ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน'
    elif pt['age'] < 5 and pt['temperture'] > "มากกว่า 39 องศาเซลเซียส":
        pt['patient_type'] = 'ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน'
    elif ("กำลังตั้งครรภ์หรือมีแผนในการมีลูก" in pt['gender']):
        pt['patient_type'] = 'ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน'
    elif ("ไม่ได้กำลังตั้งครรภ์แต่มีแผนในการมีลูก" in pt['gender']):
        pt['patient_type'] = 'ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน'
    elif ("ภาวะพร่องเอ็นไซม์ G6PD" in pt['underlying_disease']) or ("โรคอ้วน" in pt['underlying_disease']) or ("โรคตับ" in pt['underlying_disease']) or ("โรคไต" in pt['underlying_disease']) or ("โรคเบาหวาน" in pt['underlying_disease']) or ("โรคความดันโลหิตสูง" in pt['underlying_disease']):
        pt['patient_type'] = 'ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน'
    elif ("ใช่" in pt['drug_allergy']):
        pt['patient_type'] = 'ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน'
    elif (("ไม่สามารถรับประทานยาเม็ดได้" in pt['taking_medicine']) or ("รับประทานยาแล้วอาเจียน" in pt['taking_medicine'])) and ("รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" in pt['taking_medicine']):
        pt['patient_type'] = 'ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน'
    elif ("knowlesi" in pt['malaria_type']):
        pt['patient_type'] = 'ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน'
    elif ("มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา" in pt['malaria_amount']) or ("มากกว่า 1,250 ตัวต่อเม็ดเลือดขาว 100 ตัว" in pt['malaria_amount']):
        pt['patient_type'] = 'ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน'
    else:
        pt['patient_type'] = 'ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน'


def guildline(gl):
    if ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and (("falciparum" in gl['malaria_type']) and ("vivax" in gl['malaria_type'])):
        gl['guildline'] = 'un5'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and (("falciparum" in gl['malaria_type']) and ("ovale" in gl['malaria_type'])):
        gl['guildline'] = 'un5'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and (("falciparum" in gl['malaria_type']) and ("malariae" in gl['malaria_type'])):
        gl['guildline'] = 'un6'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and ("falciparum" in gl['malaria_type']) and ("ศรีสะเกษ" in gl['province'] or "กาญจนบุรี" in gl['province'] or "อุบลราชธานี" in gl['province'] or "ระนอง" in gl['province']):
        gl['guildline'] = 'un1-2'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and ("falciparum" in gl['malaria_type']) and ("ศรีสะเกษ" in gl['travel_history'] or "กาญจนบุรี" in gl['travel_history'] or "อุบลราชธานี" in gl['travel_history'] or "ระนอง" in gl['travel_history']):
        gl['guildline'] = 'un1-2'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and ("vivax" in gl['malaria_type']):
        gl['guildline'] = 'un1'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and ("vivax" in gl['malaria_type']):
        gl['guildline'] = 'un1'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and ("falciparum" in gl['malaria_type']):
        gl['guildline'] = 'un1-1'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and ("vivax" in gl['malaria_type']):
        gl['guildline'] = 'un2'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and ("ovale" in gl['malaria_type']):
        gl['guildline'] = 'un3'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and ("malariae" in gl['malaria_type']):
        gl['guildline'] = 'un4'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน" in gl['patient_type']) and ("knowlesi" in gl['malaria_type']):
        gl['guildline'] = 'un4'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and gl['age'] >= 1 and gl['weight'] < 8:
        gl['guildline'] = 'r1'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and gl['age'] >= 1 and (gl['weight'] < 8 or gl['weight'] < 9 or gl['weight'] < 10 or gl['weight'] < 11):
        gl['guildline'] = 'r2'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and gl['age'] < 1 and gl['weight'] < 8:
        gl['guildline'] = 'r3'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and gl['age'] < 1 and gl['weight'] < [8, 11]:
        gl['guildline'] = 'r4'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ("กำลังตั้งครรภ์หรือมีแผนในการมีลูก" in gl['gender']) and ("falciparum" in gl['malaria_type']):
        gl['guildline'] = 'r5'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ("กำลังตั้งครรภ์หรือมีแผนในการมีลูก" in gl['gender']) and (("vivax" in gl['malaria_type']) or ("ovale" in gl['malaria_type']) or ("malariae" in gl['malaria_type']) or ("knowlesi" in gl['malaria_type'])):
        gl['guildline'] = 'r6'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ("กำลังให้นมบุตร" in gl['gender']) and ("falciparum" in gl['malaria_type']) and ("ศรีสะเกษ" in gl['province'] or "กาญจนบุรี" in gl['province'] or "อุบลราชธานี" in gl['province'] or "ระนอง" in gl['province']):
        gl['guildline'] = 'r7-2'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ("กำลังให้นมบุตร" in gl['gender']) and ("falciparum" in gl['malaria_type']) and ("ศรีสะเกษ" in gl['travel_history'] or "กาญจนบุรี" in gl['travel_history'] or "อุบลราชธานี" in gl['travel_history'] or "ระนอง" in gl['travel_history']):
        gl['guildline'] = 'r7-2'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ("กำลังให้นมบุตร" in gl['gender']) and ("falciparum" in gl['malaria_type']):
        gl['guildline'] = 'r7-1'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ("กำลังให้นมบุตร" in gl['gender']) and (("vivax" in gl['malaria_type']) or ("ovale" in gl['malaria_type'])):
        gl['guildline'] = 'r8'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ("กำลังให้นมบุตร" in gl['gender']) and ((("falciparum" in gl['malaria_type']) and ("vivax" in gl['malaria_type'])) or (("falciparum" in gl['malaria_type']) and ("ovale" in gl['malaria_type']))):
        gl['guildline'] = 'r9'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ("กำลังให้นมบุตร" in gl['gender']) and (("falciparum" in gl['malaria_type']) and ("malariae" in gl['malaria_type'])):
        gl['guildline'] = 'r10'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ใช่" in gl['urine_color']) or ("จี-6-พีดี" in gl['underlying_disease'])) and (("ovale" in gl['malaria_type']) or ("vivax" in gl['malaria_type'])):
        gl['guildline'] = 'r11'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ใช่" in gl['urine_color']) or ("จี-6-พีดี" in gl['underlying_disease'])) and ("falciparum" in gl['malaria_type']) and ("ศรีสะเกษ" in gl['province'] or "กาญจนบุรี" in gl['province'] or "อุบลราชธานี" in gl['province'] or "ระนอง" in gl['province']):
        gl['guildline'] = 'r12-2'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ใช่" in gl['urine_color']) or ("จี-6-พีดี" in gl['underlying_disease'])) and ("falciparum" in gl['malaria_type']) and ("ศรีสะเกษ" in gl['travel_history'] or "กาญจนบุรี" in gl['travel_history'] or "อุบลราชธานี" in gl['travel_history'] or "ระนอง" in gl['travel_history']):
        gl['guildline'] = 'r12-2'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ใช่" in gl['urine_color']) or ("จี-6-พีดี" in gl['underlying_disease'])) and ("falciparum" in gl['malaria_type']):
        gl['guildline'] = 'r12-1'
    elif (("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ("knowlesi" in gl['malaria_type'])):
        gl['guildline'] = 'r13'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ("ใช่" in gl['drug_allergy']):
        gl['guildline'] = 'r14'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and ((("falciparum" in gl['malaria_type']) and ("มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา" in gl['malaria_amount'])) or ("พบเชื้อระยะแบ่งตัว" in gl['malaria_amount'])) and ("จำเป็น" in gl['status']):
        gl['guildline'] = 'r15'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (gl['weight'] < 20) and ((("knowlesi" in gl['malaria_type']) and ("มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา" in gl['malaria_amount'])) or ("พบเชื้อระยะแบ่งตัว" in gl['malaria_amount'])) and ("ไม่จำเป็น" in gl['status']):
        gl['guildline'] = 'r16'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (gl['weight'] >= 20) and ((("knowlesi" in gl['malaria_type']) and ("มากกว่า 100,000/µl ในกรณีที่ตรวจด้วยฟิล์มเลือดหนา" in gl['malaria_amount'])) or ("พบเชื้อระยะแบ่งตัว" in gl['malaria_amount'])) and ("ไม่จำเป็น" in gl['status']):
        gl['guildline'] = 'r17'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ไม่สามารถรับประทานยาเม็ดได้" in gl['taking_medicine']) or (("รับประทานยาแล้วอาเจียน" in gl['taking_medicine']) and ("รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" in gl['taking_medicine']))) and (gl['weight'] < 20) and ("falciparum" in gl['malaria_type']):
        gl['guildline'] = 'r18-1'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ไม่สามารถรับประทานยาเม็ดได้" in gl['taking_medicine']) or (("รับประทานยาแล้วอาเจียน" in gl['taking_medicine']) and ("รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" in gl['taking_medicine']))) and (gl['weight'] < 20) and (("vivax" in gl['malaria_type']) or ("ovale" in gl['malaria_type'])):
        gl['guildline'] = 'r18-2'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ไม่สามารถรับประทานยาเม็ดได้" in gl['taking_medicine']) or (("รับประทานยาแล้วอาเจียน" in gl['taking_medicine']) and ("รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" in gl['taking_medicine']))) and (gl['weight'] < 20) and ((("falciparum" in gl['malaria_type']) and ("vivax" in gl['malaria_type'])) or (("falciparum" in gl['malaria_type']) and ("ovale" in gl['malaria_type']))):
        gl['guildline'] = 'r18-3'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ไม่สามารถรับประทานยาเม็ดได้" in gl['taking_medicine']) or (("รับประทานยาแล้วอาเจียน" in gl['taking_medicine']) and ("รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" in gl['taking_medicine']))) and (gl['weight'] < 20) and (("falciparum" in gl['malaria_type']) and ("malariae" in gl['malaria_type'])):
        gl['guildline'] = 'r18-4'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ไม่สามารถรับประทานยาเม็ดได้" in gl['taking_medicine']) or (("รับประทานยาแล้วอาเจียน" in gl['taking_medicine']) and ("รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" in gl['taking_medicine']))) and (gl['weight'] >= 20) and ("falciparum" in gl['malaria_type']):
        gl['guildline'] = 'r19-1'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ไม่สามารถรับประทานยาเม็ดได้" in gl['taking_medicine']) or (("รับประทานยาแล้วอาเจียน" in gl['taking_medicine']) and ("รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" in gl['taking_medicine']))) and (gl['weight'] >= 20) and (("vivax" in gl['malaria_type']) or ("ovale" in gl['malaria_type'])):
        gl['guildline'] = 'r19-2'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ไม่สามารถรับประทานยาเม็ดได้" in gl['taking_medicine']) or (("รับประทานยาแล้วอาเจียน" in gl['taking_medicine']) and ("รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" in gl['taking_medicine']))) and (gl['weight'] >= 20) and ((("falciparum" in gl['malaria_type']) and ("vivax" in gl['malaria_type'])) or (("falciparum" in gl['malaria_type']) and ("ovale" in gl['malaria_type']))):
        gl['guildline'] = 'r19-3'
    elif ("ผู้ป่วยที่ไม่มีภาวะแทรกซ้อน แต่เป็นกลุ่มเสี่ยงที่จะเกิดภาวะแทรกซ้อน" in gl['patient_type']) and (("ไม่สามารถรับประทานยาเม็ดได้" in gl['taking_medicine']) or (("รับประทานยาแล้วอาเจียน" in gl['taking_medicine']) and ("รับประทานยาซ้ำแล้วเกิดอาการอาเจียนอีกครั้งภายใน 1 ชั่วโมง" in gl['taking_medicine']))) and (gl['weight'] >= 20) and (("falciparum" in gl['malaria_type']) and ("malariae" in gl['malaria_type'])):
        gl['guildline'] = 'r19-4'
    elif ("ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง" in gl['patient_type']) and ("จำเป็น" in gl['refer']):
        gl['guildline'] = 'c1'
    elif ("ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง" in gl['patient_type']) and ((gl['age'] < 8) or ("กำลังให้นมบุตร" in gl['gender']) or ("กำลังตั้งครรภ์หรือมีแผนในการมีลูก" in gl['gender'])) and (gl['weight'] < 20):
        gl['guildline'] = 'c2'
    elif ("ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง" in gl['patient_type']) and ((gl['age'] < 8) or ("กำลังให้นมบุตร" in gl['gender']) or ("กำลังตั้งครรภ์หรือมีแผนในการมีลูก" in gl['gender'])) and (gl['weight'] >= 20):
        gl['guildline'] = 'c3'
    elif ("ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง" in gl['patient_type']) and (gl['age'] >= 8) and (gl['weight'] < 20):
        gl['guildline'] = 'c4'
    elif ("ผู้ป่วยที่มีภาวะแทรกซ้อนหรืออาการรุนแรง" in gl['patient_type']) and (gl['age'] >= 8) and (gl['weight'] >= 20):
        gl['guildline'] = 'c5'
    else:
        gl['guildline'] = 'other1'


def showGuildline(dt):
    gl = pd.read_excel(
        r'C:\Users\CPE\webapp-main\backend\malariaGuildline.xlsx')
    # gl[gl['guildline']==dt['guildline']]
    dt['drug_detail'] = (
        gl[gl['guildline'] == dt['guildline']]['drug_detail']).tolist()
    dt['drug_administration'] = (
        gl[gl['guildline'] == dt['guildline']]['drug_administration']).tolist()
    dt['note'] = (gl[gl['guildline'] == dt['guildline']]['note']).tolist()
    dt['other'] = (gl[gl['guildline'] == dt['guildline']]['other']).tolist()


def drugResistance(dt):
    if ("falciparum" in dt['malaria_type']) and (("ศรีสะเกษ" in dt['province']) or ("ศรีสะเกษ" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา DHA-PIP มากกว่า 20% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("falciparum" in dt['malaria_type']) and (("กาญจนบุรี" in dt['province']) or ("กาญจนบุรี" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา DHA-PIP 5 - 10% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("falciparum" in dt['malaria_type']) and (("อุบลราชธานี" in dt['province']) or ("อุบลราชธานี" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา DHA-PIP น้อยกว่า 5% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("falciparum" in dt['malaria_type']) and (("ระนอง" in dt['province']) or ("ระนอง" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา DHA-PIP น้อยกว่า 5% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("vivax" in dt['malaria_type']) and (("ระนอง" in dt['province']) or ("ระนอง" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา Chloroquine 5 - 10% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("vivax" in dt['malaria_type']) and (("แม่ฮ่องสอน" in dt['province']) or ("แม่ฮ่องสอน" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา Chloroquine น้อยกว่า 5% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("vivax" in dt['malaria_type']) and (("ศรีสะเกษ" in dt['province']) or ("ศรีสะเกษ" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา Chloroquine น้อยกว่า 5% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("vivax" in dt['malaria_type']) and (("สุรินทร์" in dt['province']) or ("สุรินทร์" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา Chloroquine น้อยกว่า 5% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("vivax" in dt['malaria_type']) and (("กาญจนบุรี" in dt['province']) or ("กาญจนบุรี" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา Chloroquine น้อยกว่า 5% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("vivax" in dt['malaria_type']) and (("ราชบุรี" in dt['province']) or ("ราชบุรี" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา Chloroquine น้อยกว่า 5% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("vivax" in dt['malaria_type']) and (("จันทบุรี" in dt['province']) or ("จันทบุรี" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา Chloroquine น้อยกว่า 5% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("vivax" in dt['malaria_type']) and (("ตราด" in dt['province']) or ("ตราด" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา Chloroquine น้อยกว่า 5% (ข้อมูลจาก WHO 2010 - 2022)'
    elif ("vivax" in dt['malaria_type']) and (("ตาก" in dt['province']) or ("ตาก" in dt['travel_history'])):
        dt['drug_data'] = 'มีความเสี่ยงที่จะดื้อยา Chloroquine น้อยกว่า 10% (ข้อมูลจาก WHO 2010 - 2022)'
    else:
        dt['drug_data'] = 'ไม่พบข้อมูลความเสี่ยงในการดื้อยา'

    # def ShowGuildLine(tt):
    #   gl = pd.read_excel(r'C:\Users\CPE\webapp-main\backend\malariaGuildline.xlsx')
    #   tt['drug_detail'] = (gl[gl['guildline']==tt['guildline']]['drug_detail'])
    #   tt['drug_administration'] = (gl[gl['guildline']==tt['guildline']]['drug_administration'])

    # print(gl[gl['guildline']==dt['guildline']]['drug_detail'])
    # print(gl[gl['guildline']==dt['guildline']]['drug_administration'])
