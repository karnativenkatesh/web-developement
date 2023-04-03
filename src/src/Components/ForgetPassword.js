import React, { useState } from "react";
import './Login.css'
import logo from './logo1.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar1 from "./Navbar1";
import { Link } from "react-router-dom";
import axios from "axios";
import Login from './Login'
import { ReactSession } from "react-client-session";

toast.configure();
const ForgetPassword = () => {

    const [Password1, setPassword1] = useState("");
    const [Password, setPassword] = useState("");
    const [RegdNo, setRegdNo] = useState("");
    
    const changepassword = () => {
        console.log("method")
        var p1 = Password
        var p2 = Password1
        if(p1 === p2){
            axios.post('http://localhost:3001/changepswd',{
                Password: Password,
                regdno: RegdNo
            }).then((response) => {
                if(response.data.message){
                    toast(response.data.message)
                    window.location.href="/login"
                }
            })
        }
        else{
            toast("Both the passwords didn't match")
        }
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }
        return (
            <div className="backg">
                <Navbar1 />
                <div className="body">
                <div>
                <form className="from1" method="post" onSubmit={handleSubmit}>
                <h3 className="reg">Change Password</h3>

                <div className="form-group">
                    <label>Registration Number</label>
                    <input type="text" className="form-control" placeholder="Enter RegdNo" onChange={(e)=>setRegdNo(e.target.value)} value={RegdNo}/>
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" placeholder="Enter New Password" onChange={(e)=>setPassword(e.target.value)} value={Password} required/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm password" onChange={(e)=>setPassword1(e.target.value)} value={Password1} required/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block"  onClick={()=>{changepassword();}}>Change Password</button>
                
                <p className="forgot-password text-right">
                    Go to Login <Link to="/login">Login</Link>
                </p>
                </form>
                </div>
                <div>
                <img src={logo} className="App-logo1" alt="logo"/>
                </div>
            </div>
          </div>
        );
}

export default ForgetPassword;