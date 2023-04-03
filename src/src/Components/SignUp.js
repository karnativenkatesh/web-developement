import React, { useState } from "react";
import './SignUp.css';
import logo from './logo1.png'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar1 from "./Navbar1";
import validator from 'validator'

toast.configure();
const SignUp = () => {
    const [FirstName, setFirstname] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [LastName,setLastname] = useState("");
    const [RegistrationNumber,setRegdno] = useState("")
    const [Password1, setPassword1] = useState("");
    const [Username,setUsername] = useState("");

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/login`; 
      navigate(path);
    }

    var email,p1,p2;
    const register1 = () => {
      email =  Email
      p1 = Password
      p2 = Password1
      if(validator.isEmail(email) && p1 === p2){
        Axios.post('http://localhost:3001/register1', {
          RegistrationNumber: RegistrationNumber,
          FirstName: FirstName,
          LastName: LastName,
          Password: Password,
          Email: Email,
          Username: Username
        }).then((res) => {
          if(res.data.message !== "Registered"){
            toast(res.data.message,{position:toast.POSITION.TOP_CENTER});
            routeChange();
          }
          else{
            toast(res.data.message,{position:toast.POSITION.TOP_CENTER});
            routeChange();
          }
        });
      }
      else if(p1 !== p2){
        toast("Both the passwords do not match")
      }
      else{
        toast("Please enter all the fields or check Your email is correct or not.")
      }
    };

    function handleSubmit(event) {
      event.preventDefault();
    }
        return (
            <div className="backg">
                <Navbar1 />
                <div className="body">
                <div>
                <form className="from" method="post" onSubmit={handleSubmit}>
                <h3 className="reg">Sign Up</h3>

                <div className="form-group">
                    <label>Registartion Number</label>
                    <input type="text" className="form-control" placeholder="RegdNo" onChange={(e)=>setRegdno(e.target.value)} value={RegistrationNumber} required/>
                </div>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" onChange={(e)=>setFirstname(e.target.value)} value={FirstName} required/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" on onChange={(e)=>setLastname(e.target.value)} value={LastName} required/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={Email} required/>
                </div>

                <div className="form-group">
                    <label>Telegram Username</label>
                    <input type="username" className="form-control" placeholder="Enter Telegram username" onChange={(e)=>setUsername(e.target.value)} value={Username} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} value={Password} required/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Re-Enter password" onChange={(e)=>setPassword1(e.target.value)} value={Password1} required/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block"  onClick={()=>{register1()}}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/login">log in?</Link>
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

export default SignUp;