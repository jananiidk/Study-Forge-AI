import { useState } from "react";
import api from "../api";

function SummaryCard() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const res = await api.get("/summary");
      setSummary(res.data.summary);
    } catch {
      setSummary("Could not generate summary. Please upload notes first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sf-section">
      <div className="sf-label">Step 02 // Overview</div>
      <h2>📝 AI <em>Summary</em></h2>

      <div className="summary-action">
        <button className={`sf-btn ${loading ? "loading" : ""}`} onClick={generateSummary} disabled={loading}>
          {loading ? (
            <>
              <div className="btn-spinner" />
              <span>Generating</span>
            </>
          ) : (
            "Generate Summary"
          )}
        </button>
      </div>

      {/* Styled output terminal from App.css */}
      <div className="output-card">
        <div className="output-card-header">
          <span>Executive Summary Output</span>
          {loading && <div className="dot" />}
        </div>
        <div className="output-card-body">
          {summary || null}
        </div>
      </div>
    </section>
  );
}

export default SummaryCard;