import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userLogin;
    handleRegister(email, password);
  };
  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Sign up</h2>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth-form__input"
          placeholder="Email"
          value={userLogin.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="auth-form__input"
          placeholder="Password"
          value={userLogin.password}
          onChange={handleChange}
        />

        <div className="auth-form__footer">
          <div className="auth-form__footer-wrapper">
            <button type="submit" className="auth-form__submit-button">
              Sign up
            </button>
            <p className="auth-form__footer-text">
              Already a member?{" "}
              <Link to="/signIn" className="auth-form__footer-link">
                Log in here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;