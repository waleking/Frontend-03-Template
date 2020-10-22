/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  /* Visit the data stored in siteMetadata, we can use GraphQL query: */
  /* query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  } */
  siteMetadata: { // It's the field that we want to show how to be visited by GraphQL
    title: 'Full-Stack Bootcamp!',
    author: 'Weijing Huang'
  },
  plugins: [
      'gatsby-plugin-sass',
      {
          resolve: 'gatsby-source-filesystem',
          options: {
              name: "src",
              path: `${__dirname}/src/`
          }
      }
  ],
}
