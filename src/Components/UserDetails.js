
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { userContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";


export default function UserDetails() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const userCtx = useContext(userContext);
    console.log(userCtx);
    function SaveUserDetail() {
        console.log(userCtx);
    console.log("addUserDetails",userCtx.userState)
    console.log("userCtx.currentAccountIdState",userCtx.currentAccountIdState)
        userCtx.setUserListState([...userCtx.userListState, {...userCtx.userState,accountId:userCtx.currentAccountIdState}]);      
        userCtx.setUserState({  accountId: 0,firstName: "", lastName: "", tz: "", gender:"0", dateOfBirth: {} });
        navigate('/Details')
    }

    return (
        <div className="container">
        <div id="div1">
            <h4> בעל חשבון מספר </h4>
        </div>
        <form onSubmit={handleSubmit(SaveUserDetail)} style={{ width: "50%" }}>
            <div className="input-container">
                <label > שם פרטי</label>
                <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                    {...register("firstName", { required: true, maxLength: 20 })}
                    defaultValue={userCtx.userState.firstName}
                    onChange={(e) => userCtx.setUserState({ ...userCtx.userState, firstName: e.target.value })}>
                </input>
            </div>
            {errors?.firstName?.type === "required" && <p>שדה זה הינו שדה חובה</p>}
            {errors?.firstName?.type === "maxLength" && (
                <p>שם פרטי לא יכול להכיל יותר מ- 20 תווים</p>
            )}  
            
             <div className="input-container">
                <label > שם משפחה</label>
                <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                    {...register("lastName", { required: true, maxLength: 20 })}
                    defaultValue={userCtx.userState.lastName}
                    onChange={(e) => userCtx.setUserState({ ...userCtx.userState, lastName: e.target.value })}>
                </input>
            </div>
            {errors?.lastName?.type === "required" && <p>שדה זה הינו שדה חובה</p>}
            {errors?.lastName?.type === "maxLength" && (
                <p>שם משפחה לא יכול להכיל יותר מ- 20 תווים</p>
            )}


          <div className="input-container">
                <label >הכנס מס' תעודת זהות</label>
                <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                    {...register("tz", { required: true, maxLength: 9, minLength: 9 })}
                    type="text" 
                    onChange={(e) => {
                       userCtx.setUserState({ ...userCtx.userState, tz: e.target.value })}}
                
                    defaultValue={userCtx.userState.tz}
                     ></input>
            </div>
           {errors?.tz?.type === "required" && <p>שדה זה הינו שדה חובה</p>}
            {errors?.tz?.type === "maxLength" && (
                <p>מס' תז הינו באורך של מקסימום 9 תוים</p>
            )}
            {errors?.tz?.type === "minLength" && (
                <p>מס' תז הינו באורך של מיימנום 9 תוים</p>
            )} 


            <div className="input-container">
                <label >בחר מין</label>
                <select className="form-select" aria-label="Default select example"
                    {...register("gender", { required: true, maxLength: 4 })}
                    type="text" onChange={(e) => userCtx.setUserState({ ...userCtx.userState, gender: e.target.value })} >
                    {/* <option value=""></option> */}
                    <option value="0">בת</option>
                    <option value="1">בן</option>
                </select>
            </div>

            {errors?.gender?.type === "required" && <p>שדה זה הינו שדה חובה</p>}


            <div className="input-container">
                <span > תאריך לידה</span>
                <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                    {...register("dateOfBirth", { required: true })}
                    type="date" onChange={(e) => userCtx.setUserState({ ...userCtx.userState, dateOfBirth: e.target.value })} defaultValue={userCtx.DateOfBirthState}></input>
            </div>
            {errors?.dateOfBirth?.type === "required" && <p>שדה זה הינו שדה חובה</p>}
            <div className="actions">
            <Button variant="contained"
                style={{ cursor: "pointer", fontsize: 14 }} type="submit">שליחה
            </Button>
            </div>
        </form>




    </div>
    )
}
