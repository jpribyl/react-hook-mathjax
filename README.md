# React Hook MathJax

[![npm version](https://badge.fury.io/js/react-hook-mathjax.svg)](https://badge.fury.io/js/react-hook-mathjax)

Lightweight package with almost no dependencies which uses MathJax
v3 and React Hooks to allow inline conversion of a LaTeX string into an svg. For more details, please see the 
[example project](https://github.com/jpribyl/react-hook-mathjax/tree/master/example) or the [live demo](https://johnpribyl.com/react-hook-mathjax/). 
It looks at parsing user input and handling error states.

![Example of usage](/example_input.gif)

## Install
```
yarn add react-hook-mathjax
```

## Usage

### Basic inline display

```jsx
import React from "react";
import Tex2SVG, { MathJaxProvider } from "react-hook-mathjax";

function App() {
  return (
    <MathJaxProvider>
      <div className="App">
        <header className="App-header">
          <Tex2SVG display="inline" latex="e^{i \pi} + 1 = 0" />
        </header>
      </div>
    </MathJaxProvider>
  );
}

export default App;
```

### Customizing MathJax options
```jsx
import React from "react";
import Tex2SVG, { MathJaxProvider } from "react-hook-mathjax";

// This object contains the default options, more info at:
// http://docs.mathjax.org/en/latest/options/output/svg.html 
const mathJaxOptions = {
  svg: {
    scale: 1,                      // global scaling factor for all expressions
    minScale: .5,                  // smallest scaling factor to use
    mtextInheritFont: false,       // true to make mtext elements use surrounding font
    merrorInheritFont: true,       // true to make merror text use surrounding font
    mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
    skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
    exFactor: .5,                  // default size of ex in em units
    displayAlign: 'center',        // default for indentalign when set to 'auto'
    displayIndent: '0',            // default for indentshift when set to 'auto'
    fontCache: 'local',            // or 'global' or 'none'
    localID: null,                 // ID to use for local font cache (for single equation processing)
    internalSpeechTitles: true,    // insert <title> tags with speech content
    titleID: 0                     // initial id number to use for aria-labeledby titles
  }
}

function App() {
  return (
    <MathJaxProvider options={mathJaxOptions}>
      <div className="App">
        <header className="App-header">
          <Tex2SVG display="inline" latex="e^{i \pi} + 1 = 0" />
        </header>
      </div>
    </MathJaxProvider>
  );
}

export default App;
```


### Parsing user input

```jsx
import React from "react";
import Tex2SVG, { MathJaxProvider } from "react-hook-mathjax";

function App() {
  const [inputValue, setInputValue] = React.useState(
    "G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\kappa T_{\\mu\\nu}",
  );

  return (
    <MathJaxProvider>
      <div className="App">
        <header className="App-header">
          <h3>React Hook MathJax</h3>
          <input
            type="text"
            defaultValue={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />

          <div className="tex-container">
            <Tex2SVG class="tex" tabindex={-1} latex={inputValue} />
          </div>
        </header>
      </div>
    </MathJaxProvider>
  );
}

export default App;
```
### Handling error states
```jsx
import React from "react";
import Tex2SVG, { MathJaxProvider } from "react-hook-mathjax";

const getErrorFromHTML = (html) =>
  html.children[1].firstChild.firstChild.attributes["data-mjx-error"].value;

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
```


## API

### `MathJaxProvider` props:
#### `options` Object, optional
- Sets [MathJax configuration](http://docs.mathjax.org/en/latest/options/index.html?highlight=hub.config#configuration-objects). 
- Default: Official MathJax configuration

### `Tex2SVG` props:
#### `latex` String, required
- The string which is passed to MathJax for conversion. Must be valid ![LaTeX](https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/800px-LaTeX_logo.svg.png =50x) in order for a successful conversion into an `svg`
- Default: `''`

#### `onSuccess` (HTML Object) => void, optional
- Triggered after a successful conversion of LaTeX string into an `svg` - it receives the html object generated by MathJax
- Default: `() => {}`

#### `onError` (HTML Object) => void, optional
- Triggered after a failed conversion of LaTeX string into an `svg` - it receives the html object generated by MathJax
- Default: `() => {}`

#### `any other html attributes you want`  optional
- All other props passed into this component will be directly translated onto the DOM node
- This allows you to add css  classes or other handlers, see usage examples above



## Acknowledgements
- Big high five to Wing-Hong Andrew Ko (@wko27) for his work on the original [react-mathjax](https://github.com/wko27/react-mathjax) package.
