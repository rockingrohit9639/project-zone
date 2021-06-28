import React from 'react';
import './Forget.css';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Forget from "../../assets/forget.jpg";

export default function forget() {
    return (
        <div>
            <div className="forget">
      <ToastContainer position="bottom-left" />
      <form className="forgetform" >
        <h1>Project Zone</h1>
        <div className="forminput">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            name="email"
            
            className="forget__input"
          />
        </div>
        <div className="forminput">
          <label htmlFor="password">Password</label>
          <input
            type='password'
            id="password"
            placeholder="Enter password"
            name="password"
            className="login__input"
          />
        </div>
        <div className="remember_forgotpass">
          <div>
            <label className="container">
              Remember Me
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <RouterLink to="/login" className="forgotpass">
              Remembered?
            </RouterLink>
          </div>
        </div>
        <div className="btns">
          <button type="submit" className="loginbtn">
            Submit
          </button>
        </div>
      </form>
      <div className="forgetimage">
        <img src={Forget} alt="forgetavatar" />
      </div>
    </div>
        </div>
    )
}
