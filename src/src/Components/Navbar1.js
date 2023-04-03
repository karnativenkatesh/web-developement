import React, {Component} from "react";
import {Menuitems1} from "./Menuitems1";
import './Navbar.css';
import logo from './logo1.png';
import {Link} from 'react-router-dom'

 class Navbar1 extends Component {
     state = {clicked: false}
     handleClick = () => {
         this.setState({clicked: !this.state.clicked})
     }


     render() {
         return (
             <nav className= "NavbarItems">
                 <Link to="/"><img src={logo} alt="logo" height='100px' width='100px' /></Link>
                 <div className="menu-icon" onClick={this.handleClick}>
                     <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                 </div>
                 <ul className = {this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                     {Menuitems1.map((item, index) => {
                         return (
                            <li>
                                <Link to = {item.url} className={item.cName}>{item.title}</Link>
                            </li>
                         )
                     })}
                 </ul>
             </nav>
         )

     }
 }
 export default Navbar1;