import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { login } from "../actions/auth";
import { startLoadNotes } from "../actions/notes";
import { JournalScreen } from "../components/journal/JournalScreen";
import { auth } from "../firebase/firabase-config";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLogged(true);
        dispatch(startLoadNotes(user.uid));
      } else {
        setIsLogged(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking]);

  if (checking) {
    return (
      <div className=".body-container">
        <div className="loading-pulse"></div>
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={isLogged}
            path="/auth/*"
            component={AuthRouter}
          />

          <PrivateRoute
            exact
            isAuthenticated={isLogged}
            path="/"
            component={JournalScreen}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
