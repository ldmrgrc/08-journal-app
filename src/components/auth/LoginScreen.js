import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";

import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { clearError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "andres@gmail.com",
    password: "123456",
  });

  const { email, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (email.trim().length === 0) {
      dispatch(setError("Email is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is invalid"));
      return false;
    } else if (!validator.isLength(password, { min: 6 })) {
      dispatch(setError("Password must have at least 6 characters"));
      return false;
    } else {
      dispatch(clearError());
      return true;
    }
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleSubmit} className='animate__animated animate__fadeIn'>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          onChange={handleInputChange}
          value={password}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isLoading}
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
