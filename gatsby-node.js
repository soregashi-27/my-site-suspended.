/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require("path")
const _ = require("lodash")

exports.createPages = async graphql => {
  // const { createPage } = actions

  const result = await graphql(`
    {
      postRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter__date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter__tags) {
          fieldValue
        }
      }
    }
  `)
}
