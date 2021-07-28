import React, { useState } from "react";
import "./Forget.css";
import { Link as RouterLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { forgetpassword } from "../../axios/instance";
import Forget from "../../assets/forget.png";
import { Helmet } from "react-helmet";

export default function Forget_page()
{
  const [email, setemail] = useState("");
  const submitHandler = (e) =>
  {
    e.preventDefault();
    if (email.trim() === "")
    {
      toast.error("Type a valid email");
      return;
    } else
    {
      setemail("");
      sendemail(email);
    }
  };
  const sendemail = async (email) =>
  {
    const data = {
      email: email,
    };
    try
    {
      const res = await forgetpassword(data);
      if (!res.data.error)
      {
        toast.success(`${ res.data.msg }`);
      }
    } catch (err)
    {
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
      }
    }
  };
  return (
    <div>
    <Helmet title="Project Zone | Forget Password" />
      <ToastContainer position="bottom-left" />
      <div className="forget">
        <ToastContainer position="bottom-left" />
        <form className="forgetform">
          <h1>Project Zone</h1>
          <div className="forminput">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              name="email"
              className="forget__input"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="remember_forgotpass">
            <RouterLink to="/login" className="forgotpass">
              Remembered?
            </RouterLink>
          </div>
          <div className="btns">
            <button className="forgetbtn" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </form>
        <div className="forgetimage">
          <img src={Forget} alt="forgetavatar" />
        </div>
      </div>
    </div>
  );
}
