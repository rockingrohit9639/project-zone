import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDataLayerValues } from "../../datalayer";
import { actions } from '../../reducer';
import { magic } from "../../magic";
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import loginavatar from './../../assets/loginavatar.svg';
import "./Login.css";

const NewLogin = () => {

  const history = useHistory();
  const [loading, setLoading] = useState("");
  const [{ user,ProjectDetails,isAuthenticated,query}, dispatch] = useDataLayerValues();

  useEffect(() => {
    isAuthenticated && history.push("/");
  }, [isAuthenticated, history]);

  const [fields,setFields] = useState({
    email:"",
    password:""
  })


  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const { email,password } = fields;

  const handleSocialLogin = async () => {
    try {
      setLoading("Loading...");

      await magic.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: new URL("/callback", window.location.origin).href,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    event.preventDefault();
  
    if (email === "") {
      toast.error('Please enter your email ');
    } 
    else if (!emailTest.test(email)) {
      toast.error('Please enter a valid email');
    }
    else if (password === "") {
      toast.error('Please enter a secure password');
    }
    else if(password.length < 6 ){
      toast.error('Password should have at least 6 characters');
    } 
    else {
      const userData = {
        ...user,email: email,password:password
      };
     
      clearData();
      setUserAuth(userData);
    }
  };

  const clearData = () => {
    setFields({
      email:"",
      password:""
    });
  };

  const setUserAuth = (userData) => {

    dispatch({
      type: actions.SET_USER,
      user: userData,
    });

   // we can check if authenticated by finding user in db and can send to home page from here
  }

  return (
    <div className="login">
        <ToastContainer position="bottom-left"/>
        <form className="loginform" onSubmit={handleSubmit}>
            <h1>Project Zone</h1>
            <p>Welcome back! Please login to your account</p>
            <div className="forminput">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email"  placeholder="Enter your email address"
                    name="email" value={email} className="login__input" onChange={handleChange}
                />
            </div>
            <div className="forminput">
                <label htmlFor="password">Password</label>
                <input type={passwordShown ? "text" : "password"} id="password"  placeholder="Enter password"
                    name="password" value={password} className="login__input" onChange={handleChange}
                />
                <i className="fa fa-eye" aria-hidden="true" onClick={togglePasswordVisiblity}></i>
            </div>
            <div className="remember_forgotpass">
               <div>
                    <label className="container">Remember Me
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
               </div>
               <div>
                    <RouterLink to="/forgotpassword" className="forgotpass">
                      Forgot Password?
                    </RouterLink>
               </div>
            </div>
            <div className="btns">
                <button type="submit" className="loginbtn">Login</button>
                  <RouterLink to="/signup" className="signuplink" >
                    <button className="signupbtn">
                      Sign Up
                    </button>
                  </RouterLink>
            </div>
            <div className="social_signin">
               <p>or login with</p>
               <p className="blue google" onClick={handleSocialLogin}>Google</p>
            </div>
        </form>
        <div className="loginimage">
            <img src={loginavatar} alt="loginavatar" />
        </div>
    </div>
  );
};

export default NewLogin;
