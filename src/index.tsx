import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    MathJax: { [key: string]: any };
  }
}

export type ContextProps = {
  options?: {};
};

const MathJaxContext = createContext({});
export const MathJaxProvider: React.FC<ContextProps> = ({
  options = {},
  children = null,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [mathJax, setMathJax] = useState(window.MathJax || options);

  useEffect(() => {
    const existingScript = document.getElementById("mathjax-script");

    if (existingScript) {
      const onLoad = existingScript.onload as () => {};
      existingScript.onload = () => {
        onLoad();
        setMathJax(window.MathJax);
      };
    }

    if (!existingScript && !window.MathJax) {
      const script = document.createElement("script");
      window.MathJax = mathJax;
      script.id = "mathjax-script";
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
      script.async = true;
      script.onload = () => setMathJax(window.MathJax);
      document.head.appendChild(script);
    }

    return () => {};
  });
  return (
    <MathJaxContext.Provider value={mathJax}>
      <span ref={ref} />
      {children}
    </MathJaxContext.Provider>
  );
};

export function useTexSVG({
  latex = "",
  onSuccess = (html: HTMLElement) => {},
  onError = (html: HTMLElement) => {},
} = {}): [HTMLElement | null, { error: boolean; isLoading: boolean }] {
  const mathJax: Window["MathJax"] | null = useContext(MathJaxContext) || null;
  const [html, setHtml] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const error = !!html?.outerHTML.match(/data-mjx-error/);

  useEffect(() => {
    async function setMathJaxHTML() {
      const isReady = await mathJax?.loader.ready?.()

      if (isReady) {
        try {
          setIsLoading(true);
          const mathJaxElement = await mathJax!.tex2svgPromise(latex);

          setHtml(mathJaxElement);
        } catch (e) {
          console.error(
            "Something went really wrong, if this problem persists then please open an issue",
            e,
          );
        } finally {
          setIsLoading(false);
        }
      }
    }

    setMathJaxHTML();
  }, [mathJax, latex]);

  useEffect(() => {
    if (html && error) onError(html);
    if (html && !error) onSuccess(html);
  }, [html]);

  return [html, { error, isLoading }];
}

export type Tex2SVGProps = { [key: string]: any } & {
  latex: string;
  onError?: (html: HTMLElement) => void;
  onSuccess?: (html: HTMLElement) => void;
};
export const Tex2SVG: React.FC<Tex2SVGProps> = ({
  latex = "",
  onError = (html: HTMLElement) => {},
  onSuccess = (html: HTMLElement) => {},
  ...props
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [html, { error }] = useTexSVG({ latex, onError, onSuccess });

  useEffect(() => {
    if (html && !error) {
      Object.keys(props).map((key) => html.setAttribute(key, props[key]));
      ref.current?.appendChild(html);
      return () => {
        ref.current?.removeChild(html);
      };
    }

    return () => {};
  }, [props, html]);

  return <span ref={ref} />;
};

const Tex2SVGWithProvider: React.FC<Tex2SVGProps> = (props) => (
  <MathJaxProvider>
    <Tex2SVG {...props} />
  </MathJaxProvider>
);

export default Tex2SVGWithProvider;
