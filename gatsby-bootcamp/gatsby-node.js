const path = require("path");

module.exports.onCreateNode = ({ node, actions }) => {
   const { createNodeField } = actions;
   if (node.internal.type === 'MarkdownRemark') {
       const slug = path.basename(node.fileAbsolutePath, ".md");
       console.log('@@@@@@@@@@@@@', slug);
       createNodeField({
           node,
           name: 'slug',
           value: slug
       });
   }
}
  
module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    // 1. Get path to template
    const blogTemplate = path.resolve(`./src/templates/blog.js`);

    // 2. Get markdown data
    const response = await graphql(`
        query{
            allMarkdownRemark{
                edges{
                    node{
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    // 3. Create new page
    response.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
            component: blogTemplate,
            path: `/blog/${edge.node.fields.slug}`,
            context: {
                // use context as the parameter of the query to trigger the query when creating a new page
                slug: edge.node.fields.slug 
            }
        }) 
    })


}