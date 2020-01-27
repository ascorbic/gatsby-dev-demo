const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query DevArticleQuery {
      allDevArticle(filter: { childMarkdownRemark: { id: { ne: null } } }) {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const posts = result.data.allDevArticle.nodes
  posts.forEach((node, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    
    createPage({
      path: `posts/${node.slug}`,
      component: blogPost,
      context: {
        slug: node.slug,
        previous,
        next,
      },
    })
  })
}

