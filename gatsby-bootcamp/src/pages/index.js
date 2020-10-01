import React from "react"

// Link is a component for pre-loading the page, so we can load the page instantly by clicking the 
// hyper link.
import { Link } from 'gatsby'; 
import { Layout } from "./components/Layout";

const IndexPage = () => { // No matter what's name of the component defined in the index.js file.
    return (
        <Layout>
            <h1>Hello</h1>
            <h2>I'm Weijing, a full-stack developer living in beautiful Michigan. </h2>
            <p>Need a developer? <Link to="/contact">Contact me.</Link></p>
        </Layout>
    );
}

export default IndexPage;