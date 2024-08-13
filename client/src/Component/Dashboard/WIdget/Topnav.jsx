import React from 'react'
import '../../../assets/Style/client_style/topnav.css'
import { useUser } from '../../../Context/AuthContext';

function Topnav() {

  const { user } = useUser(); // Access user data from the context


  return (
    <div className="topNav">
    <div class="nav-l">
      <div class="sidenav">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1>FREXI TOURS && TRAVEL </h1>
    </div>
    <div className="account" v-if="logStatus">
      Hello,  {user.username}
  
    </div>
  </div>
  )
}

export default Topnav
