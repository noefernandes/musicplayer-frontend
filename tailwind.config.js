import { animation } from '@angular/animations';
import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    colors: {
      "my-dark-grey": "#1C1C1C",
      "my-grey": "#7B7B7B",
      "my-light-grey": "#D8D8D8",
      "my-orange": "#E75516",
    },
    gridTemplateColumns: {
      'auto-fit-200': 'repeat(auto-fit, minmax(200, 1fr))',
    },
  },
};
export const plugins = [];

