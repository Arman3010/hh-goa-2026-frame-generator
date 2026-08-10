import { useState } from "react";
import { loadImageFile } from "./engine";
import UploadScreen from "./components/UploadScreen";
import EditorScreen from "./components/EditorScreen";
import ResultScreen from "./components/ResultScreen";
import BeachScene from "./components/BeachScene";
import ClosingFooter from "./components/ClosingFooter";

function App() {
  const [screen, setScreen] = useState("upload");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  async function handleFileSelected(file) {
    setStatus("loading");

    try {
      const loadedImage = await loadImageFile(file);
      setImage(loadedImage);
      setScreen("editor");
      setStatus("ready");
    } catch (error) {
      console.error(error);
      setStatus(`error: ${error.message}`);
    }
  }

  function handleEditorDone(data) {
    setResult(data);
    setScreen("result");
  }

  function handleRestart() {
    setImage(null);
    setResult(null);
    setScreen("upload");
    setStatus("idle");
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-hidden bg-hh-green px-3 py-3 sm:px-6 sm:py-7">
      <div className="hh-pattern-border mx-auto h-4 w-full border-x-2 border-hh-yellow" aria-hidden="true" />
      <main className="relative z-10 mx-auto w-full max-w-full overflow-hidden">
        {screen === "upload" && (
          <UploadScreen onFileSelected={handleFileSelected} status={status} />
        )}

        {screen === "editor" && (
          <EditorScreen
            image={image}
            initialZoom={result?.zoom}
            initialPan={result?.pan}
            onDone={handleEditorDone}
          />
        )}

        {screen === "result" && (
          <ResultScreen
            result={result}
            onAdjust={() => setScreen("editor")}
            onRestart={handleRestart}
          />
        )}
      </main>
      <BeachScene />
      <ClosingFooter />
      <div className="hh-pattern-border relative z-10 mx-auto h-4 w-full border-x-2 border-hh-yellow" aria-hidden="true" />
    </div>
  );
}

export default App;
