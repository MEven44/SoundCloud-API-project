import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SingUpFormPage';
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import HomePage  from "./components/homePage";
import SongInput from "./components/NewSongForm";
import SingleSong from "./components/SingleSong";
import EditSong from "./components/EditSong.js";
import { fetchSongs } from "./store/songs";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // dispatch(fetchSongs())
  }, [dispatch]);
 
  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/new-song'>
            <SongInput />
          </Route>
          <Route path='/songs/:songId/edit'>
            <EditSong />
          </Route>
          <Route path='/songs/:songId'>
          <SingleSong />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
