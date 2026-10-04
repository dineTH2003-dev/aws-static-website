import React from "react";
import SplitText from "../components/SplitText";
import { TechIcons } from "../components/Icons";

export default function Skills({ skills }) {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <SplitText
              text="Technical"
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
              text="Disciplines"
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
            Core toolset organized by engineering domain and systems architecture.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="skills-grid">
          {skills.map((group) => (
            <div key={group.category} className="skill-domain-card">
              <div className="skill-card-top">
                <h3 className="skill-category-title">{group.category}</h3>
                <p className="skill-category-desc">{group.description}</p>
              </div>

              <div className="skill-badges-wrapper">
                {group.items.map((skill) => (
                  <div key={skill.name} className="skill-badge">
                    <span className="skill-icon">
                      {TechIcons[skill.icon] || <span className="fallback-dot">●</span>}
                    </span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
