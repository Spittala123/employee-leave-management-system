import { useNavigate } from "react-router-dom";
import AuthService from "../components/services/AuthService";
import React from "react";

const Navbar = () => {
    const isAuthenticated = AuthService.isAuthenticated();
    const navigate = useNavigate();

    return (
        <nav className='navbar navbar-strong bg-light px-10'>
            <a className='navbar-brand' href='/'>Employee Leave Management System</a>
            
                
            {isAuthenticated &&(
                <><span> {localStorage.getItem("username")} ({localStorage.getItem("Role")})</span>&nbsp;&nbsp;<button
                    className='btn btn-danger'
                    onClick={() => { AuthService.logout(); navigate("/login", { replace: true }); } }>Logout</button></>
            )}
        </nav>
    )

}

export default Navbar;