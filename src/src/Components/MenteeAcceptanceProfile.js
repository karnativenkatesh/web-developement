import React, { useState } from "react"
import './MenteeAcceptanceProfile.css'
import axios from "axios";
import { ReactSession } from "react-client-session";
import { toast } from "react-toastify";
import './nosentreq.png'

toast.configure()
export default function MenteeAcceptanceProfile(props) {
    const[display,setdisplay] = useState(true);
    var num = props.regdno
    var name = "Do you really want to accept "+num+" as your mentee?";
    var name1 = "Do you want to reject "+num+" as your mentee?";
    const menteeAccepted = () => {
        if(window.confirm(name)){
            axios.post('http://localhost:3001/setStatusA',{
                mentor:ReactSession.get("Registernum"),
                mentee:num,
                status:"Accepted"
            }).then((response)=>
            toast(response.data.message),setdisplay(false));
        }
    }

    const menteeRejected = () => {
        if(window.confirm(name1)){
            axios.post('http://localhost:3001/deletestatus',{
                mentor:ReactSession.get("Registernum"),
                mentee:num,
            }).then((response)=>toast(response.data.message),setdisplay(false));
        }
    }
    return (
            <div>
                {display ? <div className="MenteeProfile-contact-card">
                <h5 className="MenteeProfile-regdno">{props.regdno}</h5>
                <p className="MenteeProfile-cause">{props.cause}</p>
                <div className="contact--buttons">
                    <button className="contact--button-accept" onClick={()=>{menteeAccepted();}}>Accept</button>
                    <button className="contact--button-reject" onClick={()=>{menteeRejected();}}>Reject</button>
                </div>
            </div>:null}
            </div>
    )
}