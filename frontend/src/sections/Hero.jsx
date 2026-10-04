import React, { useState, useEffect } from "react";
import SplitText from "../components/SplitText";
import { UIIcons } from "../components/Icons";

function useTypingAnimation(words, speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIdx];
    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.substring(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setText(currentWord.substring(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIdx((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIdx, words, speed, pause]);

  return text;
}

export default function Hero({ profile, onOpenContactModal }) {
  const typedRole = useTypingAnimation([
    "Software Engineering",
    "Cloud & Infrastructure",
    "DevOps & SRE",
    "Cybersecurity",
    "Distributed Systems",
  ]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-section">
      <div className="section-container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-status-pill">
              <span className="status-indicator-dot" />
              <span>{profile.roleTitle} • University of Moratuwa</span>
            </div>

            <h1 className="hero-heading">
              <SplitText
                text="Hi, I'm"
                tag="span"
                splitType="chars"
                delay={45}
                duration={0.6}
                ease="power3.out"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0}
                rootMargin="0px"
                textAlign="left"
              />{" "}
              <SplitText
                text={profile.name}
                tag="span"
                splitType="chars"
                delay={45}
                duration={0.6}
                ease="power3.out"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0}
                rootMargin="0px"
                textAlign="left"
              />
            </h1>

            <div className="hero-role-badge">
              <span className="primary-role">{profile.subRole}</span>
            </div>

            <div className="hero-typed-container">
              <span className="typed-prefix">Engineering Focus &gt;</span>
              <span className="typed-text">{typedRole}</span>
              <span className="typed-cursor">|</span>
            </div>

            <p className="hero-bio">
              I build reliable, scalable, and maintainable systems. Focused on cloud-native infrastructure, distributed backend architectures, telemetry-driven observability, and automated CI/CD pipelines.
            </p>

            <div className="hero-cta-group">
              <button
                className="btn btn-primary"
                onClick={() => scrollTo("projects")}
              >
                View Projects {UIIcons.arrowRight}
              </button>
              <a
                href="/cv.pdf"
                download="Dineth_Wijesinghe_CV.pdf"
                className="btn btn-outline"
                aria-label="Download Dineth Wijesinghe CV"
              >
                {UIIcons.download} Download CV
              </a>
              <button
                className="btn btn-secondary"
                onClick={() => scrollTo("contact")}
              >
                Contact Me
              </button>
            </div>

            <div className="hero-social-row">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                {UIIcons.github}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                {UIIcons.linkedin}
              </a>
              <button
                onClick={() => onOpenContactModal("email")}
                className="social-icon-btn"
                aria-label="Direct Email"
                title="Email Address"
              >
                {UIIcons.mail}
              </button>
              <button
                onClick={() => onOpenContactModal("phone")}
                className="social-icon-btn"
                aria-label="Direct Phone / WhatsApp"
                title="Phone Number"
              >
                {UIIcons.phone}
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="avatar-frame">
              <div className="avatar-inner">
                <img
                  src="./profile.jpg"
                  alt={profile.name}
                  className="avatar-img"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `<div class="avatar-fallback">DW</div>`;
                  }}
                />
              </div>
              <div className="avatar-glow-ring" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
