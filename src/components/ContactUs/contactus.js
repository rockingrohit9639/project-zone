import React from 'react';
import './contactus.css';

export default function ContactUs()
{
    return (
        <section className="contact_section">
            <div className="contact__left">

            </div>
            <div className="contact__right">
                <div className="inputBox">
                    <label className="label">Full Name</label>
                    <input type="text" className="contact__input" placeholder="E.g. Rohit Saini" />
                </div>

                <div className="inputBox">
                    <label className="label">Email</label>
                    <input type="email" className="contact__input"  placeholder="e.g name@example.com" />
                </div>

                <div className="inputBox">
                    <label className="label">Message </label>
                    <textarea className="contact__textarea" placeholder="Message" rows="3"></textarea>
                </div>

                <button className="submitBtn"><span>Send</span></button>
            </div>
        </section>
    )
}