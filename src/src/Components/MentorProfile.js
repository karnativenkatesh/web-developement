import axios from "axios";
import React from "react";
import Navbar from './Navbar'
import './MentorProfileDisplay.css'
import { ReactSession } from "react-client-session";
import MentorProfileDisplay from "./MentorProfileDisplay";
import NoResults from "./NoResults";

class MenteeProfile extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			data: []
		}
	}


	componentDidMount(){
		axios.post('http://localhost:3001/displaymentors',{mentee:ReactSession.get("Registernum")})
		.then(response =>{
			this.setState({
				data: response.data
			})
			console.log(response.data)
		})
	}

  render() {
	const {data} = this.state
	// console.log("data",data);
    return (
      <div className="mentor-body">
		  <Navbar />
		  <div >
		  {data.length === 0 ? <NoResults data = "You don't have any mentors"/> : <div className="mentor-contacts">{data.map(da => <div key={da.cause}><MentorProfileDisplay mentor={da.mentor} name={da.name} description={da.Description} tags={da.tags} mentorTelegram={da.mentorTelegram}/></div>)}</div>}
		  </div>
      </div>
    );
  }
}

export default MenteeProfile
