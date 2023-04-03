import React, { useState } from "react";
import './BecomeAMentor.css';
import Navbar from "./Navbar";
import {Helmet} from "react-helmet";
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { ReactSession } from 'react-client-session';
import logo from './logo1.png';
import './Header.css';
import {Multiselect} from 'multiselect-react-dropdown'
import data from './Data.json'

toast.configure()
const BecomeAMentor = () => {
        const [Des,setDes] = useState("");
        const fixedRegdNo = ReactSession.get("Registernum");
        const name = ReactSession.get("Name")
        const tel = ReactSession.get("Tele")
        const [selectedValue, setSelectedValue] = useState([]);
        
        const handleChange = (e) => {
            setSelectedValue(Array.isArray(e) ? e.map(x => x.Course) : []);
        }
        const handleRemove = (selectedList, removedItem) => {
            setSelectedValue(Array.isArray(selectedValue) ? selectedList.filter(list=> list.Course !== removedItem.Course).map(x => x.Course) : []);
        }

        const [options] = useState(data);
        const Mutlislect_style = 
            {
                "chips": {
                  "background": "#8bc540"
                },
                "searchBox": {
                  "border": "none",
                  "border-bottom": "1px solid blue",
                  "border-radius": "0px"
                },
                "multiselectContainer": {
                  "color": "black"
                }
              }


    let history = useNavigate();
    
    const signup1 = () => {
      Axios.post('http://localhost:3001/signup1', {
        Name: name,
        RegistrationNumber: fixedRegdNo,
        Des: Des,
        Tags: JSON.stringify(selectedValue),
        Telegram: tel
      }).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message,{position:toast.POSITION.TOP_CENTER});
          history('/home');
        }
        else {
          history("/");
        }
      });
    };

    
    const pdelete = () => {
        if(window.confirm('Do you really want to delete your mentor account?')){
            Axios.post('http://localhost:3001/pdelete',{
                RegistrationNumber: fixedRegdNo
            }).then((response) => {
                if(response.data.message){
                    toast(response.data.message);
                    history('/home');
                }
            })
        }  
    }

        function handleSubmit(event) {
            event.preventDefault();
        }

        function validateForm(){
            return selectedValue.length > 0 && Des.length > 50;
        }
        return (

            <div className="backg">
                <Helmet>
                    <meta charSet="utf-8" />
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                    <script src="https://cdn.rawgit.com/harvesthq/chosen/gh-pages/chosen.jquery.min.js"></script>
                    <link href="https://cdn.rawgit.com/harvesthq/chosen/gh-pages/chosen.min.css" rel="stylesheet"/>
                    
                </Helmet>
                <Navbar />
                <div className="body">
                <div>
                <form className="from12" method="post" onSubmit={handleSubmit}>
                <h3 className="reg">Become A Mentor</h3>

                <div className="form-group">
                    <label>Registration Number</label>
                    <input type="text" className="form-control" placeholder="RegdNo" defaultValue={fixedRegdNo} readOnly/>
                </div>

                <div className="form-group">
                    <div style = {{width : "90%", justifyContent : "center", display: "flex"}}>
                        <div className="Dropdown--menu">
                        <label>Add skills(Atleast One skill must be selected)</label>
                        <Multiselect 
                            style = {Mutlislect_style}  
                            options={options} 
                            displayValue = "Course" 
                            onSelect={handleChange} 
                            onRemove={handleRemove}
                        />
                        </div>
                        {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}></div>}
                    </div>
                </div> 

                <div className="form-group">
                    <label>Description(Min 50 characters, upto 400 characters)</label>
                    <textarea rows="4" cols="25" className="form-control" placeholder="Description" onChange={(e)=>setDes(e.target.value)} value={Des}/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" disabled={!validateForm()}  onClick={()=>{signup1();}}>Become a Mentor</button>
                <button type="submit" className="btn1 btn-dark btn-lg btn-block" onClick={()=>{pdelete();}}>Delete Account</button>
                </form>
                </div>
                <img src={logo} className="App-logo1" alt="logo"/>
            </div>
            </div>
        );
}

export default BecomeAMentor;