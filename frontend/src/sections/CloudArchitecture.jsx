import React from "react";
import SplitText from "../components/SplitText";
import { TechIcons } from "../components/Icons";
import { CLOUD_TOOLKIT } from "../data/timeline";

export default function CloudArchitecture() {
  const architecturalPrinciples = [
    {
      title: "Reliability & Resilience",
      desc: "Architecting for failure with multi-AZ replication, health check auto-recovery, and stateless compute tiers.",
    },
    {
      title: "Declarative Automation",
      desc: "Treating infrastructure as code (IaC) with Terraform and automating release pipelines using GitHub Actions.",
    },
    {
      title: "Defense in Depth",
      desc: "Enforcing least-privilege IAM roles, isolating origins with OAC, and applying Layer 7 AWS WAF filtering.",
    },
    {
      title: "Full-Stack Observability",
      desc: "Baking distributed tracing, metrics, and structured logs into systems from inception with OpenTelemetry.",
    },
  ];

  const srePillars = [
    {
      title: "Distributed Tracing",
      tech: "OpenTelemetry + Honeycomb",
      desc: "Propagating trace context across HTTP/WebSocket service boundaries to pinpoint latency spikes and downstream bottlenecks.",
      icon: "tracing",
    },
    {
      title: "System Metrics & Alerting",
      tech: "Prometheus + CloudWatch",
      desc: "Scraping CPU, memory, network saturation, and request rates to track service-level indicators (SLIs) and error budgets.",
      icon: "metrics",
    },
    {
      title: "Structured Telemetry Logs",
      tech: "JSON Log Pipelines",
      desc: "Formatting logs with correlation IDs so log entries can be immediately mapped to trace spans for rapid root-cause diagnosis.",
      icon: "api",
    },
    {
      title: "Edge Delivery & Security",
      tech: "CloudFront + OAC + AWS WAF",
      desc: "Caching static assets globally at Points of Presence while completely isolating S3 buckets from direct internet exposure.",
      icon: "security",
    },
  ];

  return (
    <section id="cloud-arch" className="section-padding cloud-arch-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <SplitText
              text="Cloud Architecture"
              tag="span"
              splitType="chars"
              delay={40}
              duration={0.6}
              ease="power3.out"
              from={{ opacity: 0, y: 25 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.15}
              rootMargin="-50px"
              textAlign="left"
            />{" "}
            <SplitText
              text="& SRE Toolkit"
              tag="span"
              splitType="chars"
              delay={40}
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
            Core principles, cloud patterns, and telemetry systems I utilize to design, automate, and monitor reliable applications.
          </p>
          <div className="section-accent-line" />
        </div>

        {/* Architectural Principles Banner */}
        <div className="arch-principles-row">
          {architecturalPrinciples.map((p) => (
            <div key={p.title} className="principle-card">
              <h4 className="principle-title">{p.title}</h4>
              <p className="principle-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Cloud Stack Toolkit Grid */}
        <div className="cloud-toolkit-grid">
          {CLOUD_TOOLKIT.map((item) => (
            <div key={item.domain} className="cloud-stack-card">
              <div className="cloud-card-top">
                <span className="cloud-domain-tag">{item.domain}</span>
                <span className="cloud-service-icon">
                  {TechIcons[item.icon] || <span className="fallback-dot">●</span>}
                </span>
              </div>
              <h3 className="cloud-service-name">{item.service}</h3>
              <p className="cloud-concept-text">{item.concept}</p>
            </div>
          ))}
        </div>

        {/* Observability & SRE Deep Dive */}
        <div className="sre-observability-block">
          <div className="sre-block-header">
            <h3 className="sre-block-title">Observability & Reliability Framework</h3>
            <p className="sre-block-desc">
              Reliable systems demand transparent telemetry: tracing requests across boundaries, alerting on anomalies, and debugging with rich context.
            </p>
          </div>

          <div className="sre-pillars-grid">
            {srePillars.map((pillar) => (
              <div key={pillar.title} className="sre-pillar-card">
                <div className="pillar-icon-box">
                  {TechIcons[pillar.icon] || <span className="fallback-dot">●</span>}
                </div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <div className="pillar-tech-badge">{pillar.tech}</div>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
