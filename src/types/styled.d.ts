import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      lightPurple: string;
      navy: string;
      white: string;
      lightBlue: string;
      cyan: string;
      salmonPink: string;
      yellow: string;
      orange: string;
      red: string;
      gradients: {
        primary: string;
        secondary: string;
      };
    };
  }
}
