import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import Nav from "../../Comp/Nav";
import Footer from "../../Comp/footer";

export default function CommonIndex() {
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const observer = new ResizeObserver(([entry]) => {
      setFooterHeight(entry.contentRect.height);
    });

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative">
      <div
        className="relative z-10 bg-background"
        style={{ marginBottom: `${footerHeight}px` }}
      >
        <Nav />
        <Outlet />
      </div>

      <div ref={footerRef} className="fixed bottom-0 left-0 z-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
