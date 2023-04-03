import React from "react"
import { toast } from "react-toastify";
import './SentRequestsDisplay.css'

toast.configure()
export default function MenteeProfileDisplay(props) {
    return (
        // <div className="contact-card">
        //     <h5>{props.name}</h5>
        //     <div className={props.status}>
        //         {props.status}
        //     </div>
        // </div>
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{props.name}</td>
                        <td><p className={props.status}>{props.status}</p></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}