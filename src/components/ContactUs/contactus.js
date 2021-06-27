import React from 'react';
import './contactus.css';
import ParticlesBg from 'particles-bg';

export default function ContactUs() {
    return ( <
        section className = "contact_section" >

        <
        ParticlesBg type = "coweb"
        bg = { true }
        />

        <
        div className = "contact__left" >

        <
        /div> <
        div className = "contact__right" >
        <
        form action = "https://formcarry.com/s/S2thQbCqEvW"
        method = "POST" >

        <
        div className = "inputBox" >
        <
        label className = "label" > Full Name < /label> <
        input type = "text"
        name = "Fullname"
        className = "contact__input"
        placeholder = "E.g. Rohit Saini"
        required / >
        <
        /div>

        <
        div className = "inputBox" >
        <
        label className = "label" > Email < /label> <
        input type = "email"
        name = "email"
        className = "contact__input"
        placeholder = "e.g name@example.com"
        required / >
        <
        /div>

        <
        div className = "inputBox" >
        <
        label className = "label" > Message < /label> <
        textarea name = "message"
        className = "contact__textarea"
        placeholder = "Message"
        rows = "3"
        required > < /textarea> < /
        div >

        <
        button className = "submitBtn" > < span > Send < /span></button >
        <
        /form> < /
        div > <
        /section>
    )
}