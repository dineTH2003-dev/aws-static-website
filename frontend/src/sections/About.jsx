import React from "react";
import SplitText from "../components/SplitText";
import { UIIcons } from "../components/Icons";

export default function About({ profile }) {
  const coreInterests = [
    "Software Engineering",
    "Cloud Computing",
    "DevOps",
    "Site Reliability Engineering",
    "Cybersecurity",
    "Distributed Systems",
  ];

  const stats = [
    { label: "University", value: "UoM", icon: "🎓", detail: "University of Moratuwa" },
    { label: "Academic Standing", value: "3rd Year", icon: "📅", detail: "Faculty of IT" },
    { label: "Degree Program", value: "B.IT", icon: "📚", detail: "Bachelor of Information Technology" },
    { label: "Demonstrated Systems", value: "6 Systems", icon: "🚀", detail: "AWS, Kubernetes, Go, OTel" },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <SplitText
              text="About"
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
              text="Me"
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
          <div className="section-accent-line" />
        </div>

        <div className="about-grid">
          <div className="about-narrative">
            <p className="narrative-text">
              I am an <strong>Information Technology undergraduate</strong> at the <strong>University of Moratuwa</strong>.
              My engineering interests center on designing, automating, and maintaining dependable software systems and cloud infrastructure.
            </p>
            <p className="narrative-text">
              Through hands-on projects and laboratory implementations, I work with cloud-native architectures on AWS, container orchestration using Kubernetes (K3s), telemetry pipelines with OpenTelemetry, and concurrent backend services built in Go.
            </p>

            <div className="about-interests-box">
              <h4 className="interests-title">Technical Focus Areas:</h4>
              <div className="interests-tags-list">
                {coreInterests.map((interest) => (
                  <span key={interest} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="career-focus-card">
              <div className="focus-card-header">
                <span className="focus-icon">{UIIcons.target}</span>
                <span className="focus-title">Career Objective</span>
              </div>
              <p className="focus-description">{profile.careerGoal}</p>
            </div>

            <div className="about-actions">
              <a
                href="/cv.pdf"
                download="Dineth_Wijesinghe_CV.pdf"
                className="btn btn-primary"
              >
                {UIIcons.download} Download Resume
              </a>
            </div>
          </div>

          <div className="about-stats-grid">
            {stats.map((item) => (
              <div key={item.label} className="stat-card">
                <div className="stat-emoji">{item.icon}</div>
                <div className="stat-value">{item.value}</div>
                <div className="stat-label">{item.label}</div>
                <div className="stat-detail">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
