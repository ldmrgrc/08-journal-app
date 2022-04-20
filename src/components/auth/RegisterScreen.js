import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";

import { startRegisterEmailPasswordName } from "../../actions/auth";
import { clearError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
  /*
    {
        name: 'Andres',
        email: 'andres@gmail.com',
        password: '123456',
        confirmPassword: '123456'
    }
    */

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.ui);

  // useForm Hook
  const [formValues, handleInputChange] = useForm({
    name: "Juan Andres",
    email: "jandres@gmail.com",
    password: "123456*",
    confirmPassword: "123456*",
  });

  const { name, email, password, confirmPassword } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is invalid"));
      return false;
    } else if (!validator.isLength(password, { min: 6 })) {
      dispatch(setError("Password must have at least 6 characters"));
      return false;
    } else if (password !== confirmPassword) {
      dispatch(setError("Passwords must match"));
      return false;
    } else {
      dispatch(clearError());
      return true;
    }
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleSubmit} className='animate__animated animate__fadeIn'>
        {error ? <div className="auth__alert-error">{error}</div> : null}

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
        />

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

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          onChange={handleInputChange}
          value={confirmPassword}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
