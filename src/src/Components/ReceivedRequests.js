import axios from "axios";
import React from "react";
import MenteeAcceptanceProfile from "./MenteeAcceptanceProfile";
import './Mentors.css'
import { ReactSession } from "react-client-session";
import NoResults from "./NoResults";
import BecomeAMentor from "./BecomeAMentor";

class ReceivedRequests extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			data: [],
			mentor:false
		}
	}


	componentDidMount(){
		axios.post('http://localhost:3001/displayrequestedmentee',{mentor:ReactSession.get("Registernum")})
				.then(response =>{
					this.setState({
						data: response.data
					})
				})
	}

  render() {
	const {data} = this.state
    return (
      <div>
		  <div>
			{data.length === 0 ? <NoResults data = "You have no requests"/> : <div className="contacts">{data.map(da => <div key={da.mentee}><MenteeAcceptanceProfile regdno={da.mentee} cause={da.cause}/></div>)}</div>}
		  </div>
      </div>
    );
  }
}

export default ReceivedRequests;