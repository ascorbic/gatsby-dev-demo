/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const {devArticle} = useStaticQuery(graphql`
    query {
      devArticle {
        user {
          name
          profile_image_90
          twitter_username
        }
      }
    }
  `)

  const user = devArticle.user;

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        width={45}
        height={45}
        alt={user.name}
        src={user.profile_image_90}
      />
      <p>
        Written by <strong>{user.name}</strong>
        {` `}
        <a href={`https://twitter.com/${user.twitter_username}`}>
          Follow them on Twitter
        </a>
      </p>
    </div>
  )
}

export default Bio
