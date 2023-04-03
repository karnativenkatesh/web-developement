import React from "react";
import './BecomeAMentor.css';
import Navbar from "./Navbar";
import {Helmet} from "react-helmet";
import axios from 'axios'
import { toast } from "react-toastify";
import { ReactSession } from 'react-client-session';
import logo from './logo1.png';
import './Header.css';
import {Multiselect} from 'multiselect-react-dropdown'
import data from './Data.json'
import Header1 from "./Header1"

class UpdateProfile extends React.Component{

    constructor(props){
		super(props)

		this.state = {
			data1: "",
            Des: "",
            selectedValue: "",
            options: data,
            mentor: false
		}
	}
    
    
    componentDidMount(){
            axios.post('http://localhost:3001/getdetails',{mentor:ReactSession.get("Registernum")})
		        .then((response) =>{
			        this.setState({
				        data1: response.data.Tags,
                        Des : response.data.Des
			        })
		        })      
	}

    render() {
        const handleChange = (e) => {
            this.setState({
                selectedValue:(Array.isArray(e) ? e.map(x => x.Course) : [])
            })
        }
        const handleRemove = (selectedList, removedItem) => {
            this.setState({
                selectedValue:(Array.isArray(this.state.selectedValue) ? selectedList.filter(list=> list.Course !== removedItem.Course).map(x => x.Course) : [])
            })
        }
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

        function handleSubmit(event) {
            event.preventDefault();
        }
    
    var details =this.state.data1
    details = details.replace("[","")
    details = details.replaceAll("[",",")
    details = details.replaceAll("]","")
    details = details.replaceAll('"'," ")
    const arr = details.split(",")

    const update = () =>  {
        axios.post('http://localhost:3001/updatedetails', {
            mentor : ReactSession.get("Registernum"),
            Tags : JSON.stringify(this.state.selectedValue) ,
            Des : this.state.Des
        }).then((response) => 
        toast.success("Details are Updated Successfully!"),
        )
    }
        return (
        <div>
            {this.state.data1.length === 2 && this.state.Des.length === 0 ? <Header1 message="You need to be mentor first"/>:<div className="backg">
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
                <h3 className="reg">Update details</h3>

                <div className="contact--tags">
                        {arr.map((item, index) => {
                            return (
                            <span className="contact--tagItem">{item} </span>
                            )
                        })}   
                </div>


                <div className="form-group">
                    <div style = {{width : "90%", justifyContent : "center", display: "flex"}}>
                        <div className="Dropdown--menu">
                        <label>Add skills</label>
                        <Multiselect 
                            style = {Mutlislect_style}  
                            options={this.state.options} 
                            displayValue = "Course" 
                            onSelect={handleChange} 
                            onRemove={handleRemove}
                            required
                        />
                        </div>
                        {this.state.selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}></div>}
                    </div>
                </div> 

                
                <div className="form-group">
                    <label>Description(upto 400 characters)</label>
                    <textarea rows="4" cols="25" className="form-control" placeholder="Description" onChange={(e)=>this.setState({Des : e.target.value})} value={this.state.Des} required/>
                    
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={()=>{update()}}>Update</button>
                
                </form>
                </div>
                <img src={logo} className="App-logo1" alt="logo"/>
            </div>
            </div>}
        </div>
        );
                    }
}

export default UpdateProfile;