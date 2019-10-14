import React from "react"
import { Helmet } from "react-helmet-async"
import { graphql } from "gatsby"
import PostList from "../components/PostList"
import Layout from "../components/layout"

export default ({ data, pageContext: { tag } }) => {
  const { edges: posts = [] } = (data && data.allMarkdownRemark) || {}
  return (
    <Layout>
      <section>
        <Helmet title={`Posts tagged "${tag}" | Adam Jahnke`} />
        <h1>Posts tagged &laquo;{tag}&raquo;</h1>
        <PostList posts={posts} />
      </section>
    </Layout>
  )
}

export const tagPageQuery = graphql`
  query TagPage($tag: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { layout: { eq: "post" }, tags: { in: [$tag] } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fileAbsolutePath
          id
          frontmatter {
            date
            author
            tags
            title
          }
        }
      }
    }
  }
`
