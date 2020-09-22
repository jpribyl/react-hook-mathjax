import React from "react";
import Tex2SVG, { MathJaxProvider } from "react-hook-mathjax";

const getErrorFromHTML = html =>
  html.children[1].firstChild.firstChild.dataset.mjxError;

function App() {
  const [inputValue, setInputValue] = React.useState(
    "G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\kappa T_{\\mu\\nu}",
  );
  const [lastValidInput, setLastValidInput] = React.useState("");
  const [error, setError] = React.useState(null);
  const hasError = error !== null;

  return (
    <MathJaxProvider>
      <div className="App">
        <header className="App-header">
          <h3>React Hook MathJax</h3>
          <input
            className={`${hasError ? "error" : ""}`}
            type="text"
            defaultValue={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
              setError(null);
            }}
          />

          <div className="tex-container">
            <Tex2SVG
              class="tex"
              tabindex={-1}
              latex={hasError ? lastValidInput : inputValue}
              onSuccess={() =>
                setLastValidInput(hasError ? lastValidInput : inputValue)
              }
              onError={html => setError(getErrorFromHTML(html))}
            />
          </div>
          {hasError && <>hint: {error}</>}
        </header>
      </div>
    </MathJaxProvider>
  );
}

export default App;
