import React, {Component} from "react";
import {MenuItems} from "./MenuItems";
import './Navbar.css';
import logo from './logo1.png';
import {Link} from 'react-router-dom'
import { ReactSession } from "react-client-session";
import Dropdown from 'react-bootstrap/Dropdown';
import './MyProfile.css'
import {BsFillChatDotsFill,BsFillPersonFill} from 'react-icons/bs'

class Navbar extends Component {
     state = {clicked: false}
     handleClick = () => {
         this.setState({clicked: !this.state.clicked})
     }

        render() {
            const text = "      "+ReactSession.get("Registernum")
            return (
                <nav className= "NavbarItems">
                    <Link to="/home"><img src={logo} alt="logo" height='100px' width='100px' /></Link>
                    <div className="menu-icon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <ul className = {this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItems.map((item, index) => {
                            return (
                               <li>
                                   <Link to = {item.url} className={item.cName}>{item.title}</Link>
                               </li>
                            )
                        })}
                        <Dropdown>
                        <Dropdown.Toggle id="dropdown-toggle-button"><BsFillPersonFill/></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.ItemText className="itemtext">{text}</Dropdown.ItemText>
                                <Dropdown.Item className="dropdown-items" style={{textDecoration:"none"}}><Link to="/updateprofile" >Update Profile</Link></Dropdown.Item>
                                <Dropdown.Item className="dropdown-items" style={{textDecoration:"none"}}><Link to="/requests" >Requests</Link></Dropdown.Item>
                                <Dropdown.Item className="dropdown-items" style={{textDecoration:"none"}}><Link to="/mentorprofile" >My Mentors</Link></Dropdown.Item>
                                <Dropdown.Item className="dropdown-items" style={{textDecoration:"none"}}><Link to="/menteeprofile" >My Mentees</Link></Dropdown.Item>
                                <Dropdown.Item className="dropdown-items" style={{textDecoration:"none"}}><Link to="/logout" >Logout</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>
                </nav>
            )
   
        }
 }
 export default Navbar