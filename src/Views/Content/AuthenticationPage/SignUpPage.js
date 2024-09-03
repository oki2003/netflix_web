import { Link } from "react-router-dom";
import logo from "../../../assest/logo.svg";
import "./Authentication.scss";
import { useState } from "react";
function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };
  return (
    <div className="backgroundAuth">
      <nav>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </nav>
      <div className="form-wrapper">
        <h2>Sign Up</h2>
        <form action="#">
          <div className="form-control">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            {/* <label>Email or phone number</label> */}
            <label>Email</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label>Password</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              value={rePassword}
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
              required
            />
            <label>Confirm Password</label>
          </div>
          <button type="submit" onClick={(e) => handleSignUp(e)}>
            Sign Up
          </button>
        </form>
        <p>
          Go to Netflix? <Link to="/">Sign in now</Link>
        </p>
        <small>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <a href="#">Learn more.</a>
        </small>
      </div>
    </div>
  );
}

export default SignUpPage;
