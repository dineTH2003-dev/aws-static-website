import React from "react";
import SplitText from "../components/SplitText";

export default function Leadership({ leadership }) {
  return (
    <section id="leadership" className="section-padding">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <SplitText
              text="Leadership"
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
              text="& Activities"
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
            Collaborative leadership, technical team direction, and community contributions.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="leadership-grid">
          {leadership.map((item) => (
            <div key={item.title} className="leadership-card">
              <div className="leadership-icon-box">{item.icon}</div>
              <h3 className="leadership-title">{item.title}</h3>
              <div className="leadership-org">{item.organization}</div>
              <p className="leadership-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
