import React, { useState, useEffect, useRef } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const StyleProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter__date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `)

  const projectInner = node => {
    const { frontmatter, html } = node
    const { github, external, title, tech } = frontmatter

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">{/* <Icon className="Folder" /> */}</div>
            <div className="project-links">
              {github && (
                <a href={github} aria-label="Github Link">
                  {/* <Icon name="Github" /> */}
                </a>
              )}
              {external && (
                <a
                  href="{external}"
                  aria-label="External Link"
                  className="external"
                >
                  {/* <Icon name="External" /> */}
                </a>
              )}
            </div>
          </div>

          <h3 className="project-title">test</h3>
          <div className="project-description" />
        </header>

        <footer>
          <ul className="project-tech-list"></ul>
        </footer>
      </div>
    )
  }
}

export default Projects
