import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './profileButton';
import "./Navigation.css";
import DemoUser from './DemoUserButton'



function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink id="navBar" exact to="/">
          Home
        </NavLink>
        <NavLink id="navBar" to="/new-song">
          Upload
        </NavLink>
        <NavLink id="navBar" to="/albums">
          Albums
        </NavLink>
        <NavLink id="navBar" to="/albums/new-album">
          New album
        </NavLink>
        <ProfileButton id='profile-btn' user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        
   
         
            <NavLink id="navBar" to="/login">
              Log In
            </NavLink>
         
          
            <NavLink id="navBar" to="/signup">
              Sign Up
            </NavLink>
          
     

        <DemoUser></DemoUser>
      </>
    );
  }

  return (
    <div id="header">
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
