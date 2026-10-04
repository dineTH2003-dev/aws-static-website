import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import SplitText from "../components/SplitText";
import { UIIcons } from "../components/Icons";
import { EMAILJS_CONFIG } from "../data/profile";

export default function Contact({ profile, onOpenContactModal }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    setSending(true);
    setErrorMessage("");

    emailjs
      .send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: form.name,
          email: form.email,
          title: form.subject || `Portfolio Contact from ${form.name}`,
          message: form.message,
        },
        EMAILJS_CONFIG.publicKey
      )
      .then(() => {
        setSending(false);
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 6000);
      })
      .catch((err) => {
        setSending(false);
        console.error("EmailJS dispatch error:", err);
        setErrorMessage(
          err?.text || err?.message || "Failed to dispatch email. Please reach out directly."
        );
      });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <SplitText
              text="Get In"
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
              text="Touch"
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
            Open for technical conversations, engineering opportunities, and collaborative systems development.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="contact-grid">
          {/* Direct channels */}
          <div className="contact-info-panel">
            <p className="contact-info-intro">
              Whether you want to discuss cloud infrastructure, distributed systems, or exploring opportunities, feel free to reach out directly through any of these channels:
            </p>

            <div className="contact-methods-list">
              <button
                type="button"
                onClick={() => onOpenContactModal("email")}
                className="contact-channel-item"
              >
                <div className="channel-icon-box">{UIIcons.mail}</div>
                <div className="channel-text">
                  <span className="channel-label">University Email</span>
                  <span className="channel-value">{profile.email}</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onOpenContactModal("phone")}
                className="contact-channel-item"
              >
                <div className="channel-icon-box">{UIIcons.phone}</div>
                <div className="channel-text">
                  <span className="channel-label">Direct Phone / WhatsApp</span>
                  <span className="channel-value">{profile.phone}</span>
                </div>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-item"
              >
                <div className="channel-icon-box">{UIIcons.github}</div>
                <div className="channel-text">
                  <span className="channel-label">GitHub Profile</span>
                  <span className="channel-value">dineTH2003-dev</span>
                </div>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-item"
              >
                <div className="channel-icon-box">{UIIcons.linkedin}</div>
                <div className="channel-text">
                  <span className="channel-label">LinkedIn Connection</span>
                  <span className="channel-value">dineth-wijesinghe</span>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-panel">
            {sent ? (
              <div className="form-success-box">
                <div className="success-icon">✓</div>
                <h3 className="success-title">Message Sent Successfully</h3>
                <p className="success-desc">
                  Thank you for reaching out! Your message has been dispatched to my university inbox. I will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject (Optional)
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Infrastructure Engineering Inquiry"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                {errorMessage && (
                  <p className="form-error-text">⚠️ {errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="btn btn-primary form-submit-btn"
                >
                  {sending ? "Transmitting..." : "Send Message"} {UIIcons.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
