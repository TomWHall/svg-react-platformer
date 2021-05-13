import App from './App.js';
declare const React: typeof import("react");
declare const ReactDOM: typeof import("react-dom");

ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
);