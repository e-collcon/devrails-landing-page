import { useEffect } from "react";
import { SignInFlow } from "@/components/devrails/auth/SignInFlow";

/* =====================================================================
   On-page auth modal opened from the landing page's Get Started / Log In
   CTAs. Darkens the rest of the page; clicking the backdrop or pressing
   Escape closes it and returns to the landing page untouched. Wraps the
   same SignInFlow used by the standalone /signin route so both stay in
   sync (see src/routes/signin.tsx).
===================================================================== */

export function AuthModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="au-modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{ width: 440, maxWidth: "calc(100vw - 32px)" }}>
        <SignInFlow />
      </div>
    </div>
  );
}
