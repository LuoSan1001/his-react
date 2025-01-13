import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import IMenu from '../pages/menu';
import Info from '../pages/menu/info';
import Diagnosis from '../pages/menu/diagnosis';
import Fee from '../pages/menu/fee';
import Register from '../pages/menu/register';
import DRegister from '../pages/menu/dRegister';
import DTodayRegister from '../pages/menu/dTodayRegister';
import DInfo from '../pages/menu/dInfo';
import DDiagnosis from '../pages/menu/dDiagnosis';
import UserInfo from '../pages/menu/userInfo';
import PatientAdmin from '../pages/menu/patientAdmin';
import DoctorAdmin from '../pages/menu/doctorAdmin';
import DiagnosisAdmin from '../pages/menu/diagnosisAdmin';
import FeeAdmin from '../pages/menu/feeAdmin';
import SignUp from '../pages/signUp';

export default function router() {
    return (
        <Routes>
            <Route path='*' element={<Login />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/sign-up' element={<SignUp />}></Route>
            <Route path='/menu' element={<IMenu />}>
                <Route path='/menu/fee_admin' element={<FeeAdmin />}></Route>
                <Route path='/menu/diagnosis_admin' element={<DiagnosisAdmin />}></Route>
                <Route path='/menu/doctor_admin' element={<DoctorAdmin />}></Route>
                <Route path='/menu/patient_admin' element={<PatientAdmin />}></Route>
                <Route path='/menu/user_info' element={<UserInfo />}></Route>
                <Route path='/menu/d_diagnosis' element={<DDiagnosis />}></Route>
                <Route path='/menu/d_info' element={<DInfo />}></Route>
                <Route path='/menu/d_today_register' element={<DTodayRegister />}></Route>
                <Route path='/menu/d_register' element={<DRegister />}></Route>
                <Route path='/menu/register' element={<Register />}></Route>
                <Route path='/menu/info' element={<Info />}></Route>
                <Route path='/menu/diagnosis' element={<Diagnosis />}></Route>
                <Route path='/menu/fee' element={<Fee />}></Route>
            </Route>
        </Routes>
    )
}
