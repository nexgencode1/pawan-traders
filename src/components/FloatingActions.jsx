"use client";

import { INITIAL_DATA, buildWhatsAppUrl } from "@/data/pawanData";

export default function FloatingActions() {
  const { settings } = INITIAL_DATA;
  const waUrl = buildWhatsAppUrl(
    "Hello Pawan Traders, I have an enquiry regarding battery/solar solutions.",
    settings.whatsAppNumber
  );

  return (
    <>
      {/* Floating Action Buttons: True Circular Floating Action Widgets */}
      <div className="floating-actions-container" aria-label="Quick contact shortcuts">
        {/* Call Button (Bottom Left) */}
        <a
          href={`tel:+91${settings.callingNumber}`}
          className="float-round-btn call"
          title={`Call Pawan Traders: +91 ${settings.callingNumber}`}
          aria-label="Call Pawan Traders"
        >
          <div className="float-pulse-ring blue"></div>
          <i className="fa-solid fa-phone"></i>
          <span className="float-tooltip">Call: {settings.callingNumber}</span>
        </a>

        {/* WhatsApp Button (Bottom Right) */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="float-round-btn whatsapp"
          title="Chat with Pawan Traders on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <div className="float-pulse-ring green"></div>
          <i className="fa-brands fa-whatsapp"></i>
          <span className="float-tooltip">Chat on WhatsApp</span>
        </a>
      </div>
    </>
  );
}
