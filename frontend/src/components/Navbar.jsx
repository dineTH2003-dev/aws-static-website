import React, { useState, useEffect } from "react";
import { UIIcons } from "./Icons";

export default function Navbar({ isDark, onToggleTheme, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "cloud-arch", label: "Cloud & SRE" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "articles", label: "Articles" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Brand */}
        <button
          onClick={() => handleNavClick("home")}
          className="nav-brand"
          aria-label="Back to top"
        >
          <div className="brand-badge">DW</div>
          <span className="brand-text">Dineth Wijesinghe</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Controls: Theme Toggle & Mobile Menu */}
        <div className="nav-actions">
          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            aria-label="Toggle dark/light theme"
          >
            {isDark ? UIIcons.sun : UIIcons.moon}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? UIIcons.close : UIIcons.menu}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="navigation" aria-label="Mobile Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`mobile-nav-link ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
