'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-navy: #1E1A4A;
    --color-white: #FFFFFF;
    --color-light-blue: #C9EEFF;
    --color-salmon-pink: #FFB6C1;
    --color-yellow: #FFDE59;
    --color-purple: #C8A2C8;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-geist-sans);
    color: var(--color-navy);
    background-color: var(--color-white);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;
