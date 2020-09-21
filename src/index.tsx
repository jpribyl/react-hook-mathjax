import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    MathJax: any;
  }
}

type ContextProps = {
  options?: {};
};

const MathJaxContext = createContext(null);
export const MathJaxProvider: React.FC<ContextProps> = ({
  options = {},
  children = null,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [mathJax, setMathJax] = useState(window.MathJax || options);

  useEffect(() => {
    if (!window.MathJax) {
      const script = document.createElement('script');
      window.MathJax = mathJax;
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
      script.async = true;
      script.onload = () => setMathJax(window.MathJax);
      ref.current?.appendChild(script);

      return () => {
        ref.current?.removeChild(script);
      };
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

type Tex2SVGProps = any & { latex: string; onError?: () => void };
const Tex2SVG: React.FC<Tex2SVGProps> = ({ latex = '', onError = () => {}, ...props }) => {
  const mathJax = useContext(MathJaxContext);
  const [html, setHtml] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const hasError = !!html?.outerHTML.match(/data-mjx-error/);

  useEffect(() => {
    if (hasError) onError();
  }, [hasError, onError]);

  useEffect(() => {
    setHtml((mathJax as any).tex2svg?.(latex));
  }, [mathJax, latex]);

  useEffect(() => {
    if (html) {
      Object.keys(props).map(key => html.setAttribute(key, props[key]));
      ref.current?.appendChild(html);
      return () => {
        ref.current?.removeChild(html);
      };
    }

    return () => {};
  }, [props, html]);

  return <span ref={ref} />;
};

export default Tex2SVG;
