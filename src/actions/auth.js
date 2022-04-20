import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

import { googleAuthProvider, auth } from "../firebase/firabase-config";
import { types } from "../types/types";
import { clearNotes } from "./notes";
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

      signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(finishLoading());
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
        });
      });
  };
};

export const startRegisterEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
      createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, {
          displayName: name,
        });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
        });
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const startLogout = () => {
  return (dispatch) => {
    signOut(auth)
    .then(() => {
      dispatch(logout());
      dispatch(clearNotes())
    });
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};