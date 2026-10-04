import React from "react";
import SplitText from "../components/SplitText";
import { UIIcons } from "../components/Icons";

export default function Articles({ articles }) {
  return (
    <section id="articles" className="section-padding">
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
              text="Publications"
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
            Deep dives into cloud internals, virtualization layers, and distributed infrastructure.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="articles-grid">
          {articles.map((article, index) => (
            <article key={article.title} className="article-card">
              {article.image && (
                <div className="article-image-box">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="article-img"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="article-body">
                <div className="article-meta">
                  <span className="article-num">0{index + 1}</span>
                  <span className="article-badge">Medium Article</span>
                </div>

                <h3 className="article-title">{article.title}</h3>
                <p className="article-desc">{article.desc}</p>

                <div className="article-tags">
                  {article.tags.map((t) => (
                    <span key={t} className="article-tag">
                      {t}
                    </span>
                  ))}
                </div>

                {article.link ? (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-read-btn"
                  >
                    Read on Medium {UIIcons.external}
                  </a>
                ) : (
                  <span className="article-coming-soon">Coming soon ✍️</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
