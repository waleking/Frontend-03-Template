import React from 'react';
import { Layout } from '../components/layout';
import { graphql, useStaticQuery, Link } from 'gatsby';

// Goal: show lists of posts on blog page.
//
// 1. Query the title and date for each post in blog component
// 2. Render an ol on the page
// 3. Render a li with a nested h2 (title) and p (date) for each post
//    - "render array of objects in react"
// 4. Test your work!

// Another Goal: Link to blog posts
// 1. Fetch the slug for posts
// 2. Use slug to generate a link to the post page
// 3. Test your work. 

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
                        fields{
                            slug
                        }
                    }
                }
            }
        }
    `);
    const markdowns = data.allMarkdownRemark.edges;
    console.log(markdowns);
    return (
        <Layout>
            <h1>Blog</h1>
            <ol>
            {markdowns.map(markdown => (
                    <li>
                        <Link to={`/blog/${markdown.node.fields.slug}`}>
                            <h2>{markdown.node.frontmatter.title}</h2>
                            <p>{markdown.node.frontmatter.date}</p>
                        </Link>
                    </li>
                )
            )}
            </ol>
            
        </Layout>
    )
}

export default BlogPage;
