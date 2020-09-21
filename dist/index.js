"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathJaxProvider = void 0;
const react_1 = __importStar(require("react"));
const MathJaxContext = react_1.createContext(null);
exports.MathJaxProvider = ({ options = {}, children = null, }) => {
    const ref = react_1.useRef(null);
    const [mathJax, setMathJax] = react_1.useState(window.MathJax || options);
    react_1.useEffect(() => {
        var _a;
        if (!window.MathJax) {
            const script = document.createElement('script');
            window.MathJax = mathJax;
            script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
            script.async = true;
            script.onload = () => setMathJax(window.MathJax);
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.appendChild(script);
            return () => {
                var _a;
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.removeChild(script);
            };
        }
        return () => { };
    });
    return (react_1.default.createElement(MathJaxContext.Provider, { value: mathJax },
        react_1.default.createElement("span", { ref: ref }),
        children));
};
const Tex2SVG = (_a) => {
    var { latex = '', onError = () => { } } = _a, props = __rest(_a, ["latex", "onError"]);
    const mathJax = react_1.useContext(MathJaxContext);
    const [html, setHtml] = react_1.useState(null);
    const ref = react_1.useRef(null);
    const hasError = !!(html === null || html === void 0 ? void 0 : html.outerHTML.match(/data-mjx-error/));
    react_1.useEffect(() => {
        if (hasError)
            onError();
    }, [hasError, onError]);
    react_1.useEffect(() => {
        var _a, _b;
        setHtml((_b = (_a = mathJax).tex2svg) === null || _b === void 0 ? void 0 : _b.call(_a, latex));
    }, [mathJax, latex]);
    react_1.useEffect(() => {
        var _a;
        if (html) {
            Object.keys(props).map(key => html.setAttribute(key, props[key]));
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.appendChild(html);
            return () => {
                var _a;
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.removeChild(html);
            };
        }
        return () => { };
    }, [props, html]);
    return react_1.default.createElement("span", { ref: ref });
};
exports.default = Tex2SVG;
//# sourceMappingURL=index.js.map