import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';

// Export the query for gatsby-node.js to automatically trigger the Graph query process,
// and the parameter slug is defined in context.slug in gatsby-node.js.
export const query = graphql`
    query(
        $slug: String!
    ){
        markdownRemark (
            fields: {
                slug: {
                    eq: $slug
                }
            }
        ){
            frontmatter {
                title
                date
            }
            html
        }
    }
`;

const Blog = (props) => { //TODO, what's props? The response when creating a new page by gatsby which is defined in gatsby-node.js
    return (
        <Layout>
            <h1>{props.data.markdownRemark.frontmatter.title}</h1>
            <p>{props.data.markdownRemark.frontmatter.date}</p>
            <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
        </Layout>
    )
}

export default Blog;