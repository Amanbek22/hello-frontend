import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.container {
  padding: 0 12%;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  

  height: 100%;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}

a {
  text-decoration: none;
}

:not(pre) > code {
  font-family: Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace;
  background-color: #eeeeee;
  padding: 2px 4px;
  direction: ltr;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  line-height: 1.5;
  font-size: 14px;
}
button {
  cursor: pointer;
}
button:disabled{
  cursor: no-drop;
}
.dark-bg {
  background: #0B0D34;
  color: #fff;
}
button:disabled {
  cursor: not-allowed !important;
}
@media (max-width: 768px) {
  .container {
    padding: 0 5%;
  }
}
`;
export default GlobalStyle;
