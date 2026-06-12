import { useState } from "react";
import api from "../api";

function QuizGenerator() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected]   = useState({});
  const [score, setScore]         = useState(null);
  const [loading, setLoading]     = useState(false);

  const generateQuiz = async () => {
    try {
      setLoading(true);
      setScore(null);
      setSelected({});
      const res = await api.get("/quiz");
      setQuestions(res.data.questions);
    } catch {
      alert("Failed to generate quiz — upload notes first.");
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = () => {
    let marks = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.answer) marks++;
    });
    setScore(marks);
  };

  return (
    <section className="sf-section">
      <div className="sf-label">Step 04 // Assessment</div>
      <h2>🎯 Knowledge <em>Quiz</em></h2>

      <div className="summary-action" style={{ marginBottom: questions.length > 0 ? "32px" : "0" }}>
        <button className={`sf-btn ${loading ? "loading" : ""}`} onClick={generateQuiz} disabled={loading}>
          {loading ? (
            <>
              <div className="btn-spinner" />
              <span>Generating</span>
            </>
          ) : (
            "Generate Quiz"
          )}
        </button>
      </div>

      {questions.length > 0 && (
        <div className="quiz-grid">
          {questions.map((q, index) => (
            <div key={index} className="qcard">
              <div className="qcard-header">
                <div className="qcard-num">{String(index + 1).padStart(2, '0')}</div>
                <div className="qcard-question">{q.question}</div>
              </div>

              <div className="qcard-options">
                {q.options.map((option) => (
                  <label key={option} className="option-label">
                    <input
                      type="radio"
                      name={`q-${index}`}
                      value={option}
                      checked={selected[index] === option}
                      onChange={() => setSelected({ ...selected, [index]: option })}
                    />
                    <div className="option-radio" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="quiz-actions">
            <button className="sf-btn" onClick={submitQuiz} disabled={Object.keys(selected).length < questions.length}>
              Submit Quiz
            </button>
          </div>
        </div>
      )}

      {score !== null && (
        <div className="score-reveal">
          <div className="score-big">{score} / {questions.length}</div>
          <div className="score-label">Correct Answers Registered</div>
        </div>
      )}
    </section>
  );
}

export default QuizGenerator;