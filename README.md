# React Hook MathJax

[![npm version](https://badge.fury.io/js/react-hook-mathjax.svg)](https://badge.fury.io/js/react-hook-mathjax)

Lightweight package with no dependencies (except for React!) which uses MathJax
3 and React Hooks to allow inline conversion of a 
![LaTeX](https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/800px-LaTeX_logo.svg.png =50x)
string into an svg. For more details, please see the 
[example project](https://github.com/jpribyl/react-hook-mathjax/tree/master/example)
. It looks at parsing user input and managing error states.

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
          <Tex2SVG display="inline" latex="\Omega" />
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

#### `onSuccess` Function, optional
- Triggered after a successful conversion of ![LaTeX](https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/800px-LaTeX_logo.svg.png =50x) into an `svg`
- Default: `() => {}`

#### `onError`  Function, optional
- Triggered after a failed conversion of ![LaTeX](https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/800px-LaTeX_logo.svg.png =50x) into an `svg`
- Default: `() => {}`

#### `any other html attributes you want`  optional
- All other props passed into this component will be directly translated onto the DOM node
- This allows you to add css  classes or other handlers, see usage examples above



## Acknowledgements
- Big high five to Wing-Hong Andrew Ko (wko27) for his work on the original [react-mathjax](https://github.com/wko27/react-mathjax) package.
