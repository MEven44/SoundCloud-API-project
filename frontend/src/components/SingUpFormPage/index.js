import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')


  const history = useHistory()
  
  
  useEffect(() => {
    let errorValidation = []
    if (username.length < 4) errorValidation.push('Please provide a username with at least 4 characters')
    if (password.length < 6) errorValidation.push("Password must be 6 characters or more");
    if (!email.includes('@')) errorValidation.push('Please provide a valid email')
    if (username.includes('@')) errorValidation.push('User name cannot be email')
    if (password !== confirmPassword) errorValidation.push('You got a wrong password confirmation')
    
    setErrors(errorValidation)
  }, [sessionUser, username, password, email,confirmPassword]);
  
  if (sessionUser)  history.push('/');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      
      const response =  await dispatch(
        sessionActions.signup({ email,username,firstName,lastName,password })
        ).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
        
      
    } 
  };

  return (
    <form id='form' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx} id="errors">{error}</li>
        ))}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        First name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
     
        <label>
        Last name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
     
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button id='signup-btn' type="submit" disabled={!!errors.length}>Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
