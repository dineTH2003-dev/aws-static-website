import React, { useState } from "react";
import SplitText from "../components/SplitText";
import ProjectCard from "../components/ProjectCard";

export default function Projects({ projects }) {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "cloud", label: "Cloud & SRE" },
    { id: "systems", label: "Systems & Backend" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "cloud") {
      return (
        p.category.includes("Cloud") ||
        p.category.includes("SRE") ||
        p.category.includes("Kubernetes")
      );
    }
    if (filter === "systems") {
      return (
        p.category.includes("Distributed Systems") ||
        p.category.includes("Backend") ||
        p.category.includes("Systems") ||
        p.category.includes("IoT")
      );
    }
    return true;
  });

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <SplitText
              text="Featured"
              tag="span"
              splitType="chars"
              delay={50}
              duration={0.6}
              ease="power3.out"
              from={{ opacity: 0, y: 25 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.15}
              rootMargin="-50px"
              textAlign="left"
            />{" "}
            <SplitText
              text="Engineering Projects"
              tag="span"
              splitType="chars"
              delay={50}
              duration={0.6}
              ease="power3.out"
              from={{ opacity: 0, y: 25 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.15}
              rootMargin="-50px"
              textAlign="left"
            />
          </h2>
          <p className="section-subtitle">
            Production-oriented architectures, cloud infrastructure labs, and distributed systems.
          </p>
          <div className="section-accent-line" />

          {/* Filter Pills */}
          <div className="project-filter-row">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`filter-pill ${filter === c.id ? "active" : ""}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
