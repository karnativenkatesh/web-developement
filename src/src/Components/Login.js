import React, { useState } from "react";
import './Login.css'
import logo from './logo1.png'
import Axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar1 from "./Navbar1";
import { ReactSession } from 'react-client-session';
import { Link } from "react-router-dom";

toast.configure();
const Login = () => {

    const [RegdNo, setRegdNo] = useState("");
    const [Password, setPassword] = useState("");
    
    const login1 = () => {
      Axios.post('http://localhost:3001/login1', {
        RegdNo: RegdNo,
        Password: Password
      }).then((response) => {
        if (response.data.message) {
          toast.error(response.data.message,{position:toast.POSITION.TOP_CENTER});
        }
        else {
          const Name = response.data[0].FirstName+" "+response.data[0].LastName
          const tel = response.data[0].Telegram
          ReactSession.set("Registernum",RegdNo);
          ReactSession.set("Name",Name);
          ReactSession.set("Tele",tel);
          window.location.assign("/home");
          toast.success("Welcome to Campus United!!")
        }
      });
    };
    
    function validateForm() {
      return RegdNo.length > 0 && Password.length > 0;
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
                <h3 className="reg">Sign In</h3>

                <div className="form-group">
                    <label>Registration Number</label>
                    <input type="text" className="form-control" placeholder="Enter RegdNo" onChange={(e)=>setRegdNo(e.target.value)} value={RegdNo}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} value={Password}/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" disabled={!validateForm()} onClick={()=>{login1();}}>Sign In</button>
                
                <p className="forgot-password text-right">
                    Forget Password <Link to="/forgetpassword">Click Here!</Link>
                </p>
                
                <p className="forgot-password text-right">
                    Not a registered User <Link to="/signUp">sign up?</Link>
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

export default Login;