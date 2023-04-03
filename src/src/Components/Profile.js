import React,{useState} from "react"
import './Mentors.css'
import axios from "axios";
import { ReactSession } from "react-client-session";
import { toast } from "react-toastify";
import Popup from 'reactjs-popup'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";


toast.configure()
export default function Profile(props) {
    const [Des,setDes] = useState("");
    var details = props.tags;
    var name = "Do you really want to choose "+props.name+" as your mentor?";
    var regdno = props.regdno
    var fixedRegdNo = ReactSession.get("Registernum")
    var menteeTelegram = ReactSession.get("Tele")
    details = details.replace("[","")
    details = details.replaceAll("[",",")
    details = details.replaceAll("]","")
    details = details.replaceAll('"'," ")
    const arr = details.split(",")
    function handleSubmit(event) {
        event.preventDefault();
    }
    const handleclick = () => {
        if(window.confirm(name)){
            axios.post('http://localhost:3001/setStatus',
                {mentor:regdno,
                mentee:fixedRegdNo,
                Application:Des,
                menteeTelegram:menteeTelegram
            })
                .then((response)=>toast(response.data.message));
        }
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            paddingLeft:"30px",
            position:"right",
            display: "flex",
            flexDirection: "column",
        
            "& > * + *": {
                marginTop: theme.spacing(1)
            }
        },
        emptyStar: {
          color: "white"
        }
      }));
      const classes = useStyles();
    return (
        <div className="contact-card">
            <h5>{props.name}</h5>
            <div className="info-group">
                {props.description}
            </div>
            <div className="rating">
                <Stack spacing={1}>
                   <Rating 
                        name="rate" 
                        defaultValue={props.rating} 
                        precision={0.5} 
                        size="large"
                        emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.emptyStar} />} 
                        readOnly
                   />
                </Stack>
            </div>
            <div className="contact--tags">
                    {arr.map((item, index) => {
                        return (
                        <span className="contact--tagItem">{item} </span>
                        )
                    })}   
            </div>
            <Popup trigger={<button className="contact--button">Request Mentorship</button>} position="top center">
                <form className="formforapplication" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tell what you are expecting from the mentor</label>
                        <textarea rows="4" cols="25" className="form-control" placeholder="Description" onChange={(e)=>setDes(e.target.value)} value={Des} required/>
                    </div>
                    <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={()=>{handleclick();}}>Submit Request</button>
                </form>
            </Popup>
        </div>
    )
}