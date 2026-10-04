import React, { useState, useEffect } from "react";

// Data
import { PROFILE } from "./data/profile";
import { SKILLS_DATA } from "./data/skills";
import { PROJECTS_DATA } from "./data/projects";
import { ARTICLES_DATA } from "./data/articles";
import { EDUCATION_DATA, LEADERSHIP_DATA } from "./data/timeline";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import BackgroundCanvas from "./components/BackgroundCanvas";

// Sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import CloudArchitecture from "./sections/CloudArchitecture";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Leadership from "./sections/Leadership";
import Articles from "./sections/Articles";
import Contact from "./sections/Contact";

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [contactModal, setContactModal] = useState(null); // "email" | "phone" | null
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "cloud-arch",
      "projects",
      "education",
      "leadership",
      "articles",
      "contact",
    ];

    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="app-wrapper">
      <BackgroundCanvas dark={isDark} />

      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        activeSection={activeSection}
      />

      <main>
        <Hero
          profile={PROFILE}
          onOpenContactModal={(type) => setContactModal(type)}
        />

        <About profile={PROFILE} />

        <Skills skills={SKILLS_DATA} />

        <CloudArchitecture />

        <Projects projects={PROJECTS_DATA} />

        <Education education={EDUCATION_DATA} />

        <Leadership leadership={LEADERSHIP_DATA} />

        <Articles articles={ARTICLES_DATA} />

        <Contact
          profile={PROFILE}
          onOpenContactModal={(type) => setContactModal(type)}
        />
      </main>

      <Footer profile={PROFILE} />

      <ContactModal
        modalType={contactModal}
        onClose={() => setContactModal(null)}
        profile={PROFILE}
      />
    </div>
  );
}
