import React from 'react';
import './contactus.css';

export default function ContactUs() {
    return (
        <section className="section">
            <div className="container">
                    <form className="form">
                        <div className="form-group-name">
                            <label className="labels">Full Name</label>
                            <input type="text" className="box" placeholder="Project Zone" />
                        </div>
                        
                        <div className="form-group">
                            <label className="labels1">Email</label>
                            <input type="email" className="box1" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>

                        <div className="form-group">
                            <label className="labels2">Message </label>
                            <textarea className="box2" id="exampleFormControlTextarea1"  placeholder="Message" rows="3"></textarea>
                        </div>

                        <button type="submit" className="btn"><span>Send</span></button>
                    </form>
            </div>
        </section>
    )
}