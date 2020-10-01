import React from 'react';
import { Link } from 'gatsby';

const Header = () => {
    return (
        <div>
            <h1>Weijing Huang</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/about">About Me</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    )
}

export default Header;
