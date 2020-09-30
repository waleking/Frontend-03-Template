import React from "react"

// Link is a component for pre-loading the page, so we can load the page instantly by clicking the 
// hyper link.
import { Link } from 'gatsby'; 

const IndexPage = () => { // No matter what's name of the component defined in the index.js file.
    return (
        <div>
            <h1>Hello</h1>
            <h2>I'm Weijing, a full-stack developer living in beautiful Michigan. </h2>
            <p>Need a developer? <a href="/contact">Contact me.</a> </p>
            <p>Need a developer? <Link to="/contact">Contact me.</Link></p>
        </div>                        
    );
}

export default IndexPage;