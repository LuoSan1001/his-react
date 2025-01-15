import React from 'react'
import request from "./common/ajax";
import { Case } from '../type/api';

const apiGetCaseList = () => request.get("/getcaselist");
// const deleteCase = (id: String) => request.delete("deletecase", {params:{params1: id}});
const deleteCase = (id: String) => request.get(`deletecase/${id}`);
const apiAddCase = (params: Case) => request.post("/addcase", params);
const apiUpdateCase = (params: Case) => request.post("/updatecase", params);
const apiGetPatient = (pno: number) => request.get(`patient?pno=${pno}`);
const apiGetAllPatient = () => request.get(`patient`);
const apiUpdatePatient = (params: any) => request.put("/patient", params);
const apiGetDiagnosisByPNo = (pNo: number) => request.get(`/diagnosis?pNo=${pNo}`)
const apiGetDiagnosisByDNo = (dNo: number) => request.get(`/diagnosis?dNo=${dNo}`)
const apiGetAllDiagnosis = () => request.get(`/diagnosis`)
const apiGetFeeByPNo = (pNo: number) => request.get(`/fee?pNo=${pNo}`);
const apiGetAllFee = () => request.get(`/fee`);
const apiUpdateFee = (params: any) => request.put("/fee", params);
const apiInsertRegister = (params: any) => request.post("/register", params);
const apiGetRegisterByDNo = (dNo: Number) => request.get(`/register?dNo=${dNo}`);
const apiGetRegisterByDNoAndToday = (dNo: Number, today: String) => request.get(`/register?dNo=${dNo}&rfVisitTime=${today}`);
const apiGetDoctorByDNo = (dNo: number) => request.get(`/doctor?dNo=${dNo}`);
const apiGetAllDoctor = () => request.get(`/doctor`);
const apiGetAllUser = () => request.get(`/user`);
const apiLogin = (params: any) => request.post(`/login`, params);
const apiSignUp = (params: any) => request.post(`/user`, params);
const apiUpdateDoctor = (params: any) => request.put("/doctor", params);
const apiUpdateDiagnosis = (params: any) => request.put("/diagnosis", params);
const apiUpdateUser = (params: any) => request.put("/user", params);
const apiDeletePatient = (params: any) => request.delete("/patient/" + params.toString());
const apiDeleteDiagnosis = (params: any) => request.delete("/diagnosis/" + params.toString());
const apiDeleteDoctor = (params: any) => request.delete("/doctor/" + params.toString());
const apiDeleteFee = (params: any) => request.delete("/fee/" + params.toString());
const apiDeleteUser = (params: any) => request.delete("/user/" + params.toString());
const apiInsertDoctor = (params: any) => request.post("/doctor", params)



export {
    apiGetCaseList,
    deleteCase,
    apiAddCase,
    apiUpdateCase,
    apiGetPatient,
    apiUpdatePatient,
    apiGetDiagnosisByPNo,
    apiGetFeeByPNo,
    apiUpdateFee,
    apiInsertRegister,
    apiGetRegisterByDNo,
    apiGetRegisterByDNoAndToday,
    apiGetDoctorByDNo,
    apiGetDiagnosisByDNo,
    apiGetAllUser,
    apiGetAllPatient,
    apiGetAllDoctor,
    apiGetAllDiagnosis,
    apiGetAllFee,
    apiLogin,
    apiSignUp,
    apiUpdateDoctor,
    apiUpdateDiagnosis,
    apiUpdateUser,
    apiDeletePatient,
    apiDeleteDiagnosis,
    apiDeleteDoctor,
    apiDeleteFee,
    apiDeleteUser,
    apiInsertDoctor
}
