import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Footer = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    author
                }
            }
        }
    `);
    console.log(data.site.siteMetadata);
    return (
        <div>
           Created by {data.site.siteMetadata.author}, ©2020. 
        </div>
    )
}

export default Footer;
