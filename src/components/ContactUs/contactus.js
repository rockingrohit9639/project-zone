import React, { useState } from 'react';
import { useDataLayerValues } from "../../datalayer";
import { ToastContainer, toast } from 'react-toastify';
import { sendmessage } from './../../axios/instance';
import ParticlesBg from 'particles-bg';
import './contactus.css';

export default function ContactUs()
{

  const [{ user }] = useDataLayerValues();
  const [fields, setFields] = useState({
    fullname: `${ user.fname } ${ user.lname }`,
    email: user.email,
    message: " "
  });

  const { fullname, email, message } = fields;

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

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!fullname)
    {
      toast.error("Please enter your Full Name");
    } else if (email.trim() === " ")
    {
      toast.error("Please enter your email");
    } else if (!emailTest.test(email))
    {
      toast.error('Please enter a valid email');
    } else if (!message)
    {
      toast.error('Please write a message/feedback to connect with us');
    } else
    {
      sendMessage(fullname, email, message);
      clearFields();
    }
  };

  const sendMessage = async (fullname, email, message) =>
  {
    const body = {
      fullname: fullname,
      email: email,
      message: message
    };
    try
    {
      const res = await sendmessage(body);
      if (!res.data.error && res.data.success)
      {
        toast.success(`Thank you for contacting us. Your message has been sent.`);
      }
    } catch (err)
    {
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
      }
    }

  }

  const clearFields = () =>
  {
    setFields({
      message: " "
    });
  };

  return (
    <section className="contact_section" >
      <ParticlesBg type="coweb"
        bg={true}
      />
      <div className="contact__left" >
      </div>
      <div className="contact__right" >
        <ToastContainer position="bottom-right" />
        <form onSubmit={handleSubmit}>
          <div className="inputBox" >
            <label className="label" > Full Name </label>
            <input type="text"
              name="fullname"
              value={fullname}
              onChange={handleChange}
              className="contact__input"
              placeholder="E.g. Rohit Saini"
              required />
          </div>

          <div className="inputBox" >
            <label className="label" > Email </label>
            <input type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="contact__input"
              placeholder="e.g name@example.com"
              required />
          </div>

          <div className="inputBox">
            <label className="label"> Message </label>
            <textarea
              name="message"
              value={message}
              onChange={handleChange}
              className="contact__textarea"
              placeholder="Message"
              rows="3"
              required />
          </div>

          <button type="submit" className="submitBtn"><span> Send </span></button>
        </form>
      </div>
    </section>
  )
}