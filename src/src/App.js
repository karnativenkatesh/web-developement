import './App.css';
import Header from './Components/Header.js';
import Login from './Components/Login.js';
import BecomeAMentor from './Components/BecomeAMentor.js';
import MentorshipGuidelines from './Components/MentorshipGuidelines.js';
import Mentors from './Components/Mentors.js';
import React from 'react';
import SignUp from './Components/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header1 from './Components/Header1';
import MentorshipGuidelines1 from './Components/MentorshipGuidelines1';
import Logout from './Components/Logout';
import { ReactSession } from 'react-client-session';
import ProtedtedRoute from './Components/ProtectedRoute';
import MentorProfile from './Components/MentorProfile';
import MenteeProfile from './Components/MenteeProfile';
import Requests from './Components/Requests'
import ForgetPassword from './Components/ForgetPassword'
import UpdateProfile from './Components/UpdateProfile'
// import ChatContainer from './Components/ChatContainer'

const App = () => {
  ReactSession.setStoreType("localStorage");
    return (
      <Router>
        <div className="App">
            <Routes>
                <Route path='/mentorship-guidelines' element={< MentorshipGuidelines />}></Route>
                <Route exact path='/' element={< Header />}></Route>
                <Route path='/login' element={< Login />}></Route>
                <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
                <Route path='/signup' element={< SignUp />}></Route>
                <Route path='/logout' element={<Logout/>}></Route>
                <Route element={<ProtedtedRoute/>}>
                  <Route exact path='/home' element={< Header1 />}></Route>
                  <Route path='/become-a-mentor' element={< BecomeAMentor />}></Route>
                  <Route exact path='/mentorship-guidelinesin' element={<MentorshipGuidelines1/>}></Route>
                  <Route path='/mentors' element={< Mentors />}></Route>
                  <Route path='/mentorprofile' element={<MentorProfile/>}></Route>
                  <Route path='/requests' element={<Requests/>}></Route>
                  <Route path="/updateprofile" element={<UpdateProfile />}></Route>
                  <Route path='/menteeprofile' element={<MenteeProfile/>}></Route>
                  </Route>
            </Routes>
        </div>
      </Router>
    );
}
export default App;