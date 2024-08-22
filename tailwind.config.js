import { animation } from '@angular/animations';
import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    keyframes: {
      slideUp: {
        '0%': { transform: 'translateY(100vh)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      }
    },
    animation: {
      slideUp: 'slideUp 0.5s forwards',
    },
    colors: {
      "my-dark-grey": "#1C1C1C",
      "my-grey": "#7B7B7B",
      "my-light-grey": "#D8D8D8",
      "my-orange": "#E75516",
      "my-black": "#0F0A0A",
      "card-grey": "#2F2F2F"
    },
  },
};
export const plugins = [];

