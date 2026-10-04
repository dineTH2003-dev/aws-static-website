import React from "react";
import SplitText from "../components/SplitText";

export default function Education({ education }) {
  return (
    <section id="education" className="section-padding">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <SplitText
              text="Academic"
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
              text="Background"
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
            Formal education and core academic foundations in computer science & IT.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="education-timeline-container">
          <div className="timeline-rail" />

          {education.map((item, index) => (
            <div key={item.period} className="timeline-item">
              <div className="timeline-node">
                <span className={`node-marker ${item.current ? "current" : ""}`}>
                  {item.current ? "NOW" : `'${item.period.slice(2, 4)}`}
                </span>
              </div>

              <div className="timeline-content-card">
                <div className="timeline-period-badge">{item.period}</div>
                <h3 className="timeline-degree-title">{item.degree}</h3>
                <div className="timeline-institution">{item.institution}</div>
                <p className="timeline-details-text">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
