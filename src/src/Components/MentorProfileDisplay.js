import React from "react"
import './Mentors.css'
import { toast } from "react-toastify";
import 'reactjs-popup/dist/index.css';
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import axios from "axios";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";

toast.configure()
export default function MentorProfileDisplay(props) {
    var details = props.tags;
    var mentor = props.mentor
    const [value, setValue] = React.useState(0);
    details = details.replace("[","")
    details = details.replaceAll("[",",")
    details = details.replaceAll("]","")
    details = details.replaceAll('"'," ")
    const arr = details.split(",")
    const submitrating = () => {
        axios.post('http://localhost:3001/setrating',{
            mentor:mentor,
            rating:value
        }).then((response)=>{toast(response.data.message)})
    }
    const sendmessage = () => {
        window.location.assign(props.mentorTelegram)
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            paddingLeft:"30px",
            position: "right",
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
            <div className="mentorRating">
                <Stack spacing={1}>
                    <Rating  
                        className="ratingButtonStars"
                        name="size-large" 
                        precision={0.5} 
                        emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.emptyStar} />}
                        value={value} 
                        size="large" 
                        onChange={(event, newValue) => {setValue(newValue);}}
                    />
                </Stack>
                <button onClick={submitrating} className="ratingButton">Submit rating</button>
            </div>
            <div className="contact--tags">
                    {arr.map((item, index) => {
                        return (
                        <span className="contact--tagItem">{item} </span>
                        )
                    })}   
            </div>
            <button onClick={sendmessage} className="contact--button1">Send message</button>
        </div>
    )
}