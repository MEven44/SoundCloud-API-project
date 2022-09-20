import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './profileButton';
import "./Navigation.css";
import DemoUser from './DemoUserButton'



function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  console.log('NAVIGATION BAR SESSION USER', sessionUser)
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
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
    <div id='header'>
      <NavLink id="navBar" exact to="/">
        Home
      </NavLink>
      {isLoaded && sessionLinks}
      <NavLink id="navBar" to="/new-song">
        Upload
      </NavLink>
    </div>
  );
}

export default Navigation;
