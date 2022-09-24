import React from "react";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../store/session'
import *  as sessionActions from "../../store/session";

function DemoUser () {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()


    const handleClick = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.demoLogin({ credential:'musician@user.io', password:'password' })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
          history.push("/");
        }
      );
    };
    
    return <button id='Demo-user' onClick={handleClick}>Demo user</button>;
}

export default DemoUser