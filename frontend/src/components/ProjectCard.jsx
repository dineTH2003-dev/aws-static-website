import React from "react";
import { UIIcons } from "./Icons";

export default function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <div className="project-card-header">
        <span className="project-index">0{index + 1}</span>
        <span className="project-category-badge">{project.category}</span>
      </div>

      <h3 className="project-title">{project.title}</h3>

      {project.architecture && (
        <div className="project-arch-flow" title="System Architecture Flow">
          <span className="arch-label">FLOW:</span> {project.architecture}
        </div>
      )}

      {project.problem && (
        <div className="project-problem-box">
          <span className="problem-label">Problem:</span> {project.problem}
        </div>
      )}

      <p className="project-built-text">{project.built || project.desc}</p>

      <div className="project-tech-list">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">
            {t}
          </span>
        ))}
      </div>

      <div className="project-actions">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link"
            aria-label={`View source code for ${project.title} on GitHub`}
          >
            {UIIcons.github} Source Code
          </a>
        )}

        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link btn-link-accent"
            aria-label={`View live demo for ${project.title}`}
          >
            {UIIcons.external} Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
