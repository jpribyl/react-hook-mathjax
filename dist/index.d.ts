import React from 'react';
declare global {
    interface Window {
        MathJax: any;
    }
}
declare type ContextProps = {
    options?: {};
};
export declare const MathJaxProvider: React.FC<ContextProps>;
declare type Tex2SVGProps = any & {
    latex: string;
    onError?: () => void;
};
declare const Tex2SVG: React.FC<Tex2SVGProps>;
export default Tex2SVG;
