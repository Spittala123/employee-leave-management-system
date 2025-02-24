import { useNavigate } from "react-router-dom";
import AuthService from "../components/services/AuthService";

const Navbar = () => {
    const isAuthenticated = AuthService.isAuthenticated();
    const navigate = useNavigate();

    return (
        <nav className='navbar navbar-strong bg-light px-3'>
            <a className='navbar-brand' href='/'>React Auth</a>
            {
               isAuthenticated && localStorage.getItem("Role")==="Admin" &&
                (
                    <>
                    <a href="./ApproveLeave">Approve Leave</a>
                    <a href="./RequestLeave" >Request Leave</a>
                    </>
                )
            }
             
                {isAuthenticated && localStorage.getItem("Role") === "User" &&
                (
                    <>
                    {/* <a href="./ApproveLeave">Approve Leave</a>*/}
                    <a href="./RequestLeave">Request Leave</a> 
                    </>
                )}
            
            {isAuthenticated &&(
                <><span> {localStorage.getItem("username")} ({localStorage.getItem("Role")})</span><button
                    className='btn btn-danger'
                    onClick={() => { AuthService.logout(); navigate("/login", { replace: true }); } }>Logout</button></>
            )}
        </nav>
    )

}

export default Navbar;