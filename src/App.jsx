import { useState } from "react";
import { loadImageFile } from "./engine";
import UploadScreen from "./components/UploadScreen";
import EditorScreen from "./components/EditorScreen";
import ResultScreen from "./components/ResultScreen";

function App() {
  const [step, setStep] = useState("upload");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  async function handleFileSelected(file) {
    setStatus("loading");

    try {
      const loadedImage = await loadImageFile(file);
      setImage(loadedImage);
      setStep("position");
      setStatus("ready");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
      setStatus(`error: ${error.message}`);
    }
  }

  function handleEditorDone(data) {
    setResult(data);
    setStep("result");
    window.scrollTo(0, 0);
  }

  function handleRestart() {
    setImage(null);
    setResult(null);
    setStep("upload");
    setStatus("idle");
    window.scrollTo(0, 0);
  }

  return (
    <div className="min-h-[100svh] w-full max-w-full overflow-x-clip bg-hh-green px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
      <div
        className="hh-pattern-border mx-auto h-3 w-full max-w-full border-x-2 border-hh-yellow sm:h-4"
        aria-hidden="true"
      />
      <main className="relative z-10 mx-auto w-full max-w-full overflow-x-clip">
        {step === "upload" && (
          <UploadScreen onFileSelected={handleFileSelected} status={status} />
        )}

        {step === "position" && (
          <EditorScreen
            image={image}
            initialZoom={result?.zoom}
            initialPan={result?.pan}
            onDone={handleEditorDone}
          />
        )}

        {step === "result" && (
          <ResultScreen
            result={result}
            onAdjust={() => {
              setStep("position");
              window.scrollTo(0, 0);
            }}
            onRestart={handleRestart}
          />
        )}
      </main>
      <div
        className="hh-pattern-border relative z-10 mx-auto h-3 w-full max-w-full border-x-2 border-hh-yellow sm:h-4"
        aria-hidden="true"
      />
    </div>
  );
}

export default App;
