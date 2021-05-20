import React, { useState, useEffect, useRef } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import styled from "styled-components"
import { usePrefersReducedMotion } from "@hooks"

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

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &focus-with-in {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
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

  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }
  })

  const GRID_LIMIT = 6
  const projects = data.projects.edges.filter(({ node }) => node)
  const firstToSix = projects.slice(0, GRID_LIMIT)
  const projectsToShow = firstToSix

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

          <h3 className="project-title">
            <a href={external}>{title}</a>
          </h3>
          <div className="project-description" />
        </header>

        <footer>
          <ul className="project-tech-list"></ul>
        </footer>
      </div>
    )
  }

  return (
    <StyleProjectsSection>
      <h2>Other Noteworthy Projects</h2>

      <ul className="project-grid">
        {prefersReducedMotion ? (
          <div>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node)}</StyledProject>
              ))}
          </div>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}
                >
                  <StyledProject
                    key={i}
                    // ref={element => (revealProjects.current[i] = element)}
                    style={{
                      transitionDelay: `${
                        i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0
                      }ms`,
                    }}
                  >
                    {projectInner(node)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>
    </StyleProjectsSection>
  )
}

export default Projects
