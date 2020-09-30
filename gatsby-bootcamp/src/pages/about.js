import React from 'react'
import { Link } from 'gatsby';

const AboutPage = () => {
    return (
        <div>
           <h1>About Me</h1> 
           <p>I'm trying to be a full-stack engineer, and learning the Front-end skills on freecodecamp.</p>
           <p><Link to="/contact">Contact me.</Link></p>
        </div>
    )
}

export default AboutPage;