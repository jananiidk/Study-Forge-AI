import { useState } from "react";
import api from "../api";

function UploadPDF() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const uploadFile = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await api.post("/upload", formData);
      setMessage(res.data.message);
    } catch {
      setMessage("Upload failed — please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  return (
    <section className="sf-section">
      <div className="sf-label">Step 01 // Input</div>
      <h2>📚 Upload <em>Notes</em></h2>
      
      <div className="upload-layout">
        {/* Dropzone Container mapped to CSS */}
        <div 
          className={`drop-zone ${isDragging ? "dragging" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              setFile(e.dataTransfer.files[0]);
              setMessage("");
            }
          }}
        >
          <svg className="drop-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p>
            <strong>{file ? file.name : "Choose a PDF file"}</strong>
            <span>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "or drag and drop it here"}</span>
          </p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>

        {/* Informational Sidebar mapped to CSS */}
        <div className="upload-info">
          <div className="upload-info-item">
            <div className="upload-info-num">i</div>
            <div className="upload-info-text">
              <strong>Supported Format</strong>
              <span>Upload text-based PDF documents up to 25MB.</span>
            </div>
          </div>
          <div className="upload-info-item">
            <div className="upload-info-num">ii</div>
            <div className="upload-info-text">
              <strong>Processing</strong>
              <span>Our models index your documentation securely to enable precision tracking.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-action" style={{ marginTop: "24px" }}>
        <button className={`sf-btn ${uploading ? "loading" : ""}`} onClick={uploadFile} disabled={uploading || !file}>
          {uploading ? (
            <>
              <div className="btn-spinner" />
              <span>Uploading</span>
            </>
          ) : (
            "Upload PDF"
          )}
        </button>
        
        {message && (
          <div className={`status-msg ${message.toLowerCase().includes("failed") ? "error" : "success"}`}>
            {message}
          </div>
        )}
      </div>
    </section>
  );
}

export default UploadPDF;