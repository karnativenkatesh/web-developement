import axios from "axios";
import React from "react";
import './SentRequests.css'
import { ReactSession } from "react-client-session";
import SentRequestsDisplay from './SentRequestsDisplay';
import './nosentreq.png'

class SentRequests extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			data: []
		}
	}


	componentDidMount(){
		axios.post('http://localhost:3001/sentrequests',{mentee:ReactSession.get("Registernum")})
		.then(response =>{
			this.setState({
				data: response.data
			})
			console.log(response.data)
		})
	}

  render() {
    return (
      <div>
		  {this.state.data.length === 0 ? <div><img alt="No request image" src="./nosentreq.png"/><h4 style={{fontSize:"35px"}}>You haven't requested any mentor yet..!</h4></div> : <div><table className="table1">
			  <tr>
				<th>Mentor</th>
				<th>Request Status</th>
			  </tr>
		  </table>
		  {this.state.data.length > 0 && this.state.data.map((da)=> <div key={da._id}><SentRequestsDisplay name={da.name} status={da.status}/></div>)}</div>}
      </div>
    );
  }
}

export default SentRequests;