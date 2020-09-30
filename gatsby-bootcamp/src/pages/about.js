import React from 'react'
import { Link } from 'gatsby';
import Header from "./components/header";
import Footer from './components/footer';

const AboutPage = () => {
    return (
        <div>
            <Header />
            <h1>About Me</h1> 
            <p>I'm trying to be a full-stack engineer, and learning the Front-end skills on freecodecamp.</p>
            <p><Link to="/contact">Contact me.</Link></p>
            <Footer />
        </div>
    )
}

export default AboutPage;