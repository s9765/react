import React from "react";
import { Route, Routes, Link } from 'react-router-dom';
import Direction from "./Direction";
import Details from "./Details";
import UserDetails from "./UserDetails";
import { useContext } from "react";
import { userContext } from './UserContext';
import End from './End';

export default function Home() {

    const userCtx = useContext(userContext);
    return (
        <div>
            <header>
            <h1>הי, שלום לך {userCtx.userNameState} {userCtx.familyNameState}</h1>
            <nav className="container-fluid">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item"><Link to='/Details' className="nav-link" data-toggle="tab" >למילוי הטופס</Link></li>
                    <li className="nav-item"><Link to='/Direction' className="nav-link" data-toggle="tab" >להנחיות להשלמת הטופס</Link></li>
                </ul>
            </nav>
            </header>
            ברוכים הבאים
            <Routes>
                <Route path="/Details" element={<Details />} />
                <Route path="/Direction" element={<Direction />} />
                <Route path="/UserDetails" element={<UserDetails />} />
                <Route path="/End" element={<End />} />
            </Routes>
        </div>
    )
}