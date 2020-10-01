import React from 'react'
import { Link } from 'gatsby';
import { Layout } from '../components/Layout';

const AboutPage = () => {
    return (
        <Layout>
            <h1>About Me</h1> 
            <p>I'm trying to be a full-stack engineer, and learning the Front-end skills on freecodecamp.</p>
            <p><Link to="/contact">Contact me.</Link></p>
        </Layout>
    )
}

export default AboutPage;