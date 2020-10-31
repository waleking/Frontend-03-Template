import React from 'react';
import { Layout } from '../components/layout';
import { graphql, useStaticQuery } from 'gatsby';

// Goal: show lists of posts on blog page.
//
// 1. Query the title and date for each post in blog component
// 2. Render an ol on the page
// 3. Render a li with a nested h2 (title) and p (date) for each post
//    - "render array of objects in react"
// 4. Test your work!

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query{
            allMarkdownRemark{
                edges{
                    node{
                        frontmatter{
                            title
                            date
                        }
                        html
                        excerpt
                    }
                }
            }
        }
    `);
    const markdowns = data.allMarkdownRemark.edges;
    return (
        <Layout>
            <h1>Blog</h1>
            <ol>
            {markdowns.map(markdown => (
                    <li>
                        <h2>{markdown.node.frontmatter.title}</h2>
                        <p>{markdown.node.frontmatter.date}</p>
                    </li>
                )
            )}
            </ol>
            
        </Layout>
    )
}

export default BlogPage;
