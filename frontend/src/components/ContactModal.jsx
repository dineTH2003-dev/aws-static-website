import React, { useState } from "react";
import { UIIcons } from "./Icons";

export default function ContactModal({ modalType, onClose, profile }) {
  const [copied, setCopied] = useState(false);

  if (!modalType) return null;

  const isEmail = modalType === "email";
  const value = isEmail ? profile.email : profile.phone;
  const label = isEmail ? "Official University Email" : "Direct Phone / WhatsApp";
  const icon = isEmail ? UIIcons.mail : UIIcons.phone;

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      onClick={onClose}
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal-content">
        <button onClick={onClose} className="modal-close" aria-label="Close dialog">
          {UIIcons.close}
        </button>

        <div className="modal-icon-badge">{icon}</div>

        <p className="modal-label">{label}</p>
        <div className="modal-value-box">{value}</div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleCopy}>
            {copied ? "✓ Copied to Clipboard" : "Copy Value"}
          </button>
          {isEmail ? (
            <a
              href={`mailto:${value}`}
              className="btn btn-outline"
              onClick={onClose}
            >
              {UIIcons.mail} Open Mail App
            </a>
          ) : (
            <a
              href={`tel:${value.replace(/\s/g, "")}`}
              className="btn btn-outline"
              onClick={onClose}
            >
              {UIIcons.phone} Call Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
