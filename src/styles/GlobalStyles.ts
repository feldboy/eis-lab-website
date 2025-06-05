'use client';

import { createGlobalStyle } from 'styled-components';

// Theme definition
export const theme = {
  colors: {
    primary: '#4A1A4A',
    secondary: '#8B5A9C',
    lightPurple: '#B794C4',
    navy: '#2D1B69',
    white: '#FFFFFF',
    lightBlue: '#A8E6F7',
    cyan: '#7DD3FC',
    salmonPink: '#FFB6C1',
    yellow: '#FFDE59',
    orange: '#FF8C42',
    red: '#FF6B6B',
    gradients: {
      primary: 'linear-gradient(135deg, #4A1A4A 0%, #8B5A9C 100%)',
      secondary: 'linear-gradient(135deg, #A8E6F7 0%, #7DD3FC 100%)'
    }
  }
};

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary-purple: #4A1A4A;
    --color-secondary-purple: #8B5A9C;
    --color-light-purple: #B794C4;
    --color-navy: #2D1B69;
    --color-white: #FFFFFF;
    --color-light-blue: #A8E6F7;
    --color-cyan: #7DD3FC;
    --color-salmon-pink: #FFB6C1;
    --color-yellow: #FFDE59;
    --color-orange: #FF8C42;
    --color-red: #FF6B6B;
    --gradient-primary: linear-gradient(135deg, #4A1A4A 0%, #8B5A9C 100%);
    --gradient-secondary: linear-gradient(135deg, #A8E6F7 0%, #7DD3FC 100%);
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', 'Helvetica', sans-serif;
    color: var(--color-navy);
    background-color: var(--color-white);
    overflow-x: hidden;
    line-height: 1.6;
    font-weight: 600;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  button {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Mobile responsive typography */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    html {
      font-size: 13px;
    }
  }

  /* Prevent horizontal scroll on mobile */
  body, html {
    max-width: 100vw;
    overflow-x: hidden;
  }
`;

export default GlobalStyles;
