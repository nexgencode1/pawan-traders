"use client";

import { INITIAL_DATA, buildWhatsAppUrl } from "@/data/pawanData";

export default function FloatingActions() {
  const { settings } = INITIAL_DATA;
  const waUrl = buildWhatsAppUrl("Hello Pawan Traders, I have an enquiry regarding battery/solar solutions.", settings.whatsAppNumber);

  return (
    <div className="floating-actions">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn whatsapp"
        title="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp" style={{ fontSize: "1.3rem" }}></i>
        <span>WhatsApp</span>
      </a>
      <a
        href={`tel:+91${settings.callingNumber}`}
        className="float-btn call"
        title="Call Pawan Traders"
      >
        <i className="fa-solid fa-phone" style={{ fontSize: "1.1rem" }}></i>
        <span>Call Now</span>
      </a>
    </div>
  );
}

