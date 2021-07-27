import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDataLayerValues } from "../../datalayer";
import { actions } from '../../reducer';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { magic } from "../../magic";
import "./SignUp.css";
import signupavatar from './../../assets/signupavatar.svg';
import { signup } from '../../axios/instance';
import { Oval } from "react-loading-icons";
import { Helmet } from "react-helmet"; 

const useStyles = makeStyles((theme) => ({
  root: {
    height: "91vh"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp()
{
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [{ user, isAuthenticated }, dispatch] = useDataLayerValues();

  useEffect(() =>
  {
    isAuthenticated && history.push("/");
  }, [isAuthenticated, history]);

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () =>
  {
    setPasswordShown(!passwordShown);
  };

  const handleSocialLogin = async () =>
  {
    try
    {

      await magic.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: new URL("/callback", window.location.origin).href,
      });
    } catch (err)
    {
      console.log(err);
    }
  };

  const { firstName, lastName, email, password } = fields;

  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    setFields((prevState) =>
    {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) =>
  {
    setIsLoading(true);
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    event.preventDefault();

    if (firstName === "")
    {
      setIsLoading(false);
      toast.error('Please enter your First Name');
    }
    else if (lastName === "")
    {
      setIsLoading(false);
      toast.error('Please enter your Last Name');
    }
    else if (email === "")
    {
      setIsLoading(false);
      toast.error('Please enter your email ');
    }
    else if (!emailTest.test(email))
    {
      setIsLoading(false);
      toast.error('Please enter a valid email');
    }
    else if (password === "")
    {
      setIsLoading(false);
      toast.error('Please enter a secure password');
    }
    else if (password.length < 6)
    {
      setIsLoading(false);
      toast.error('Password should have at least 6 characters');
    }
    else
    {
      clearData();
      setUserAuth(firstName, lastName, email, password);
    }
  };

  const clearData = () =>
  {
    setFields({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  };

  const setUserAuth = async (firstName, lastName, email, password) =>
  {
    const userData = {
      ...user,
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
    };
    const body = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    };
    try
    {
      const res = await signup(body);
      if (!res.data.error)
      {
        localStorage.setItem('tokken', res.data.accesstoken);

        setIsLoading(false);
        dispatch({
          type: 'SET_AUTH',
          isAuthenticated: true,
        });
        dispatch({
          type: 'SET_USER',
          user: userData,
        });

      }
    } catch (err)
    {
      if (err.response)
      {
        setIsLoading(false);
        toast.error(`${ err.response.data.error }`);
      }
    }
  };

  return (
    <div className="signup">
    <Helmet  title="Project Zone | SignUp"/>
      <div className="signupimage">
        <img src={signupavatar} alt="signupavatar" />
      </div>
      <ToastContainer position="top-right" />
      <form className="signupform" onSubmit={handleSubmit}>
        <h2> <span className="welcome"> Welcome to </span> Project Zone </h2>
        <div className="forminput">
          <label htmlFor="name">First Name</label>
          <input type="name" id="firstname" placeholder="Enter your First Name"
            name="firstName" value={firstName} onChange={handleChange}
          />
        </div>
        <div className="forminput">
          <label htmlFor="lastname">Last Name</label>
          <input type="name" id="lastname" placeholder="Enter your Last Name"
            name="lastName" value={lastName} onChange={handleChange} />

        </div>
        <div className="forminput">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email address"
            name="email" value={email} onChange={handleChange}
          />
        </div>
        <div className="forminput">
          <label htmlFor="password">Password</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            id="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <i
            className="fa fa-eye"
            aria-hidden="true"
            onClick={togglePasswordVisiblity}
          ></i>
        </div>
        <div className="btns">
          <button type="submit" className="signup-btn">Sign Up</button>
          <button className="login-btn">
            <RouterLink to="/login" className="loginlink" >
              Login
            </RouterLink>
          </button>

        </div>
        <div className="social_signin">
          <p>or signup with</p>
          <p className="blue google" onClick={handleSocialLogin}>Google</p>
        </div>
      </form>
    </div>
  );
}