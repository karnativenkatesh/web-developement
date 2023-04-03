import logo from './logo1.png';
import React from 'react';
import Navbar1 from './Navbar1';
import './Header.css';


function Header() {
  return (
    <div className="header">
      <Navbar1 />
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

export default Header;