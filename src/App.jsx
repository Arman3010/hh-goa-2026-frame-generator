import { useState } from "react";
import { generateFramedImage } from "./engine";

function App() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState("idle");

  async function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setStatus("loading");

    try {
      // Temporary placeholder frame
      const frameUrl = "/test-frame.svg";

      const blob = await generateFramedImage(
        file,
        null,
        frameUrl
      );

      setPreviewUrl(
        URL.createObjectURL(blob)
      );

      setStatus("ready");
    } catch (err) {
      console.error(err);

      setStatus(
        "error: " + err.message
      );
    }
  }

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "sans-serif",
      }}
    >
      <h2>
        Engine Test Harness — Member 1
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <p>
        Status: {status}
      </p>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          style={{
            width: 300,
            marginTop: 20,
          }}
        />
      )}
    </div>
  );
}

export default App;