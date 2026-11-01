"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import QuickEnquiryModal from "@/components/QuickEnquiryModal";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  const handleOpenEnquiry = (prod = null) => {
    setEnquiryProduct(prod);
    setEnquiryModalOpen(true);
  };

  useEffect(() => {
    const handleCustomOpen = (e) => {
      handleOpenEnquiry(e?.detail || null);
    };
    window.addEventListener("open-quick-enquiry", handleCustomOpen);
    return () => window.removeEventListener("open-quick-enquiry", handleCustomOpen);
  }, []);

  if (isAdmin) {
    return <main style={{ minHeight: "100vh" }}>{children}</main>;
  }

  return (
    <>
      <Header onOpenEnquiry={handleOpenEnquiry} />
      <main>{children}</main>
      <Footer onOpenEnquiry={handleOpenEnquiry} />
      <FloatingActions onOpenEnquiry={handleOpenEnquiry} />

      <QuickEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        preselectedProduct={enquiryProduct}
      />
    </>
  );
}
