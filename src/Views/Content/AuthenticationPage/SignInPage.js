import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assest/logo.svg";
import "./Authentication.scss";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

function SignInPage(props) {
  const navigate = useNavigate();
  const { auth } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/MainPage", { replace: true });
      }
    });
  }, []);
  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/MainPage");
      })
      .catch((error) => {
        console.log(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div className="backgroundAuth">
      <nav>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </nav>
      <div className="form-wrapper">
        <h2>Sign In</h2>
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
          <button type="submit" onClick={(e) => handleSignIn(e)}>
            Sign In
          </button>
          <div className="form-help">
            {/* <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div> */}
            {/* <a href="#">Need help?</a> */}
          </div>
        </form>
        <p>
          New to Netflix? <Link to="/SignUp">Sign up now</Link>
        </p>
        <small>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <a href="#">Learn more.</a>
        </small>
      </div>
    </div>
  );
}

export default SignInPage;
