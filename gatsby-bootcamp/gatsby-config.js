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
        },
        'gatsby-plugin-sharp', // Exposes several image processing functions built on the Sharp image processing library. 
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false
                        }
                    }
                ]
            }
        }
    ],
}