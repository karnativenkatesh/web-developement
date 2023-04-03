import React from "react"
import './MenteeProfileDisplay.css'
import { toast } from "react-toastify";
import 'reactjs-popup/dist/index.css';

toast.configure()
export default function MenteeProfileDisplay(props) {
    const sendmessage = () => {
        window.location.assign(props.menteeTelegram)
    }
    return (
        <div className="contact-card">
            <h5>{props.mentee}</h5>
            <div className="mentee-info-group">
                {props.cause}
            </div>
            <button onClick={sendmessage} className="contact--button1">Send message</button>
        </div>
    )
}