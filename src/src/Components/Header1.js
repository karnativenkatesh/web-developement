import logo from './logo1.png';
import React from 'react';
import Navbar from './Navbar';
import './Header.css';
import { toast } from 'react-toastify';

toast.configure()
function Header1(props) {
  toast.info(props.message)
  return (
      <div className="header">
      <Navbar />
      <header className="--header">
        <div className='tex'>
          <div className='title'>
            <p className='cam'>CAMPUS</p>
            <p className='uni'>UNITED</p>
          </div>
          <img src={logo} className="App-logo" alt="logo"/>
        </div>
      </header>
    </div>
  );
}

export default Header1;