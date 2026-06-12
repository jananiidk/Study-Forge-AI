import { useState } from "react";
import api from "../api";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await api.post("/chat", { question });
      setAnswer(res.data.answer);
    } catch {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <section className="sf-section">
      <div className="sf-label">Step 03 // Inquiry</div>
      <h2>🤖 Chat With <em>Notes</em></h2>

      <div className="chat-layout">
        {/* Chat input form zone */}
        <div className="chat-input-area">
          <textarea
            value={question}
            placeholder="Ask anything about your notes… (Press Enter to query)"
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />
          <button className={`sf-btn ${loading ? "loading" : ""}`} onClick={askQuestion} disabled={loading || !question.trim()}>
            {loading ? <div className="btn-spinner" /> : "Ask AI"}
          </button>
        </div>

        {/* Dedicated output container */}
        <div className="chat-output">
          {loading ? (
            <div className="thinking">
              <span /><span /><span />
            </div>
          ) : (
            answer
          )}
        </div>
      </div>
    </section>
  );
}

export default ChatBox;