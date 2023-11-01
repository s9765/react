
import { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { userContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

export default function Details() {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const userCtx = useContext(userContext);
    const [parentIdState, setParentIdState] = useState('');
    const [currentAccountIdState, setCurrentAccountIdState] = useState(0)

    function AddUserDetails() {

        if (userCtx.currentUserOfAccountIdState == 3) {
            alert('כבר הוספת 3 בעלים לחשבון');
        }
        else {
            userCtx.setCurrentUserOfAccountIdState(userCtx.currentUserOfAccountIdState + 1)
            navigate('/UserDetails');
        }
    }


    function SaveAccountDetails() {

        for (let i = 0; i < userCtx.accountListState.length; i++) {
            userCtx.accountListState[i].accountTypeId = parseInt(userCtx.accountListState[i].accountTypeId, 10);
            userCtx.accountListState[i].currencyTypeId = parseInt(userCtx.accountListState[i].currencyTypeId, 10);
        }

        for (let i = 0; i < userCtx.userListState.length; i++) {
            userCtx.userListState[i].gender = parseInt(userCtx.userListState[i].gender, 10);
        }

        axios.post('https://localhost:7194/General', {
            users: userCtx.userListState, accounts: userCtx.accountListState
        })
            .then(result => {
                console.log("result", result);
            })
            .catch(error => {
                console.error("Error:", error);
                //אם חזר שגיאות להדפיס אותם ללקוח
            });
        console.log("accountListState", userCtx.accountListState)
        console.log("userListState", userCtx.userListState)
        navigate('/End');
    }

    function AddOneAccount() {

        if (userCtx.currentUserOfAccountIdState == 0) {
            userCtx.setCurrentUserOfAccountIdState(userCtx.currentUserOfAccountIdState + 1)
            navigate('/UserDetails');
        }
        else {
            userCtx.setAccountListState([...userCtx.accountListState, userCtx.accountState]);
            console.log("addOneAccount", userCtx.accountState);
            userCtx.setCurrentAccountIdState(userCtx.currentAccountIdState + 1)
            userCtx.setAccountState({ id: userCtx.currentAccountIdState, accountName: '', accountTypeId: 0, currencyTypeId: 0, sumToPass: 0 })

            if (userCtx.currentAccountIdState == 2) {
                SaveAccountDetails();
            }
        }
    }

    return (
        <div className="container">
            <div id="div1">
                <h2>פרטי בעל החשבון</h2>
            </div>
            <form onSubmit={handleSubmit(AddOneAccount)} style={{ width: "50%" }}>

                <div className="input-container">
                    <label > שם החשבון</label>
                    <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                        {...register("firstName", { required: true, maxLength: 20 })}
                        value={userCtx.accountState.accountName}
                        onChange={(e) => userCtx.setAccountState({ ...userCtx.accountState, accountName: e.target.value })}>
                    </input>
                </div>
                {errors?.firstName?.type === "required" && <p>שדה זה הינו שדה חובה</p>}
                {errors?.firstName?.type === "maxLength" && (
                    <p>שם פרטי לא יכול להכיל יותר מ- 20 תווים</p>
                )}


                <div className="input-container">
                    <label >בחר סוג חשבון</label>
                    <select className="form-select" aria-label="Default select example"
                        {...register("accountTypeId", { required: true, maxLength: 4 })}
                        type="text" onChange={(e) => userCtx.setAccountState({ ...userCtx.accountState, accountTypeId: e.target.value })}
                        defaultValue={userCtx.accountState.accountTypeId} >
                        {/* כדאי להביא את הנתונים מהסרור */}
                        <option value="1">עוש</option>
                        <option value="3">השקעות</option>
                    </select>
                </div>

                {errors?.accountTypeId?.type === "required" && <p>שדה זה הינו שדה חובה</p>}


                <div className="input-container">
                    <label >בחר סוג מטבע</label>
                    <select className="form-select" aria-label="Default select example"
                        {...register("currency", { required: true, maxLength: 4 })}
                        type="text" onChange={(e) => userCtx.setAccountState({ ...userCtx.accountState, currencyTypeId: e.target.value })}
                        value={userCtx.accountState.currencyTypeId} >
                        <option value="1">דולר</option>
                        <option value="3">שח</option>
                    </select>
                </div>


                {errors?.currency?.type === "required" && <p>שדה זה הינו שדה חובה</p>}


                <div className="input-container">
                    <label  > סכום שאותו תכנסי לחשבון</label>
                    <input type="number"  {...register("sum", { required: true, min: 0 })}
                        defaultValue={userCtx.accountState.sumToPass}
                        onChange={(e) =>
                            userCtx.setAccountState({ ...userCtx.accountState, sumToPass: e.target.value })
                        }
                    />
                </div>

                {errors?.sum?.type === "required" && <p>שדה זה הינו שדה חובה</p>}
                {errors?.numChildren?.type === "min" && <p>אין אפשרות להזין מס' קטן מאפס</p>}

                <div className="actions">

                    <Button
                        variant="contained"
                        style={{ cursor: "pointer", fontSize: 14 }}
                        type="button"
                        onClick={AddUserDetails}
                    >
                        מלא פרטי בעל חשבון
                    </Button>


                    <Button variant="contained"
                        style={{ cursor: "pointer", fontsize: 14 }} type="submit"
                    >שמור חשבון
                    </Button>

                    <Button variant="contained"
                        style={{ cursor: "pointer", fontsize: 14 }} type="button"
                        onClick={SaveAccountDetails}
                    >סיים
                    </Button>
                </div>


            </form>
        </div>
    )

}
