import React from "react";
import { UIIcons } from "./Icons";

export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-meta">
          <p className="footer-copy">
            © {currentYear} {profile.name}. Engineered for reliability & performance.
          </p>
          <p className="footer-subcopy">
            {profile.university} • {profile.degree}
          </p>
        </div>

        <div className="footer-links">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="footer-icon-link"
          >
            {UIIcons.github}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="footer-icon-link"
          >
            {UIIcons.linkedin}
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Send direct email"
            className="footer-icon-link"
          >
            {UIIcons.mail}
          </a>
        </div>
      </div>
    </footer>
  );
}
