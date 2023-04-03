import axios from "axios";
import React from "react";
import Navbar from './Navbar'
import Profile from "./Profile";
import './Mentors.css'
import SearchBar from "./SearchBar";
import Errorfile from "./Errorfile";
import { ReactSession } from "react-client-session";

class Mentors extends React.Component {

	state = {
		data: [],
		error: null
	}

	handleGetRequest = async (e) => {
		e.preventDefault();
		const searchterm = e.target.elements.searchvalue.value.charAt(0).toUpperCase() + e.target.elements.searchvalue.value.slice(1);
		const result = axios.post('http://localhost:3001/getProfile',{sendvalue:searchterm,regdno:ReactSession.get("Registernum")}).then(response =>{return response;});
		const res = (await result)
		if(res.data.length === 0) {
			this.setState({error: "No Mentors found"})
		}
		else if(!searchterm){
			this.setState({error:"No Mentors found"})
		}
		else{
			this.setState({data:res.data,error:null})
		}
		
	  }

	render(){
		return (
			<div className="mentor-body">
					<Navbar />
					<SearchBar handleGetRequest={this.handleGetRequest} />
					{(this.state.error == null && this.state.data.length === 0) ? 
					<div><img style={{height:"175px",width:"200px"}} alt="Searching logo" src="./search.png"/><h4 style={{fontFamily:"Vollkorn"}}>Type to search</h4></div> : <div>{this.state.error !== null ? <div><Errorfile data={this.state.error} /></div> : <div className="contacts">
						{this.state.data.length > 0 && this.state.data.map((da)=> <div key={da.RegistrationNumber}><Profile rating={da.Rating} regdno={da.RegistrationNumber} name={da.Name} description={da.Description} tags={da.Tags}/></div>)}
					</div>}</div> }
					
			</div>
		);
	}
}

export default Mentors;