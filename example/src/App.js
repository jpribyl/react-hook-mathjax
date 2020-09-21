import React from "react";
import Tex2SVG, { MathJaxProvider } from "react-hook-mathjax";

function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [latex, setLatex] = React.useState("");
  const [hasError, setHasError] = React.useState(false);

  return (
    <MathJaxProvider>
      <div className="App">
        <header className="App-header">
          <input
            className={`${hasError ? "error" : ""}`}
            type="text"
            onChange={(e) => {
              setInputValue(e.target.value);
              setHasError(false);
            }}
          />

          <Tex2SVG
            class="tex"
            tabindex={-1}
            latex={hasError ? latex : inputValue}
            onSuccess={() => setLatex(hasError ? latex : inputValue)}
            onError={() => setHasError(true)}
          />
        </header>
      </div>
    </MathJaxProvider>
  );
}

export default App;
