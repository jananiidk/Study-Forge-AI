import { useEffect, useRef } from "react";
import UploadPDF from "../components/UploadPDF";
import SummaryCard from "../components/SummaryCard";
import ChatBox from "../components/ChatBox";
import QuizGenerator from "../components/QuizGenerator";

function Home() {
  const cursorRef = useRef(null);

  // Smooth cursor glow tracking
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      curX += (mouseX - curX) * 0.1;
      curY += (mouseY - curY) * 0.1;
      el.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll visibility reveal intersections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.05 }
    );

    document.querySelectorAll(".sf-section").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo)";
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      {/* Decorative Custom Radial Glow Element hooks */}
      <div 
        ref={cursorRef} 
        style={{
          position: 'fixed',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(201,185,122,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 999,
          top: '-200px',
          left: '-200px'
        }} 
      />

      {/* Hero Header Area mapped to matching CSS segments */}
      <section className="hero">
        <div className="hero-glow" />

        <div className="hero-content">
          <p className="hero-eyebrow">AI-Powered Learning Workspace</p>

          <h1>
            <span className="line"><span>Study</span></span>
            <span className="line"><span>Forge <em>AI</em></span></span>
          </h1>

          <p className="hero-sub">
            Upload your core course materials. Generate summaries, real-time contextual feedback loops, and automated self-assessment quizzes instantly.
          </p>
        </div>

        <div className="hero-scroll">
          <span>Scroll to forge</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* Main Structural Interactive Blocks layout */}
      <main>
        <UploadPDF />
        <SummaryCard />
        <ChatBox />
        <QuizGenerator />
      </main>

      {/* Shared Platform Footer aligned to App.css layouts */}
      <footer className="sf-footer">
        <div className="sf-footer-brand">StudyForge AI</div>
        <div className="sf-footer-tag">© 2026 // Next-Gen Education</div>
      </footer>
    </div>
  );
}

export default Home;