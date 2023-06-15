/** @type {import('tailwindcss').Config} */

const postcssScss = require('postcss-scss');

module.exports = {
  important: true,
  content: ['./components/**/*.twig', './templates/**/*.html.twig'],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'light-blue': '#0073e6',
        'blue': '#0065bd',
        'medium-blue': '#01559e',
        'dark-blue': '#1e2943',
        'cyan': '#46B6E3',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },
    },
  },
  rules: [
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            parser: postcssScss,
            // other options here
          },
        },
        // other loaders here
        'sass-loader',
      ],
    },
    // @todo is the above needed
  ],
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
  safelist: [
    'container',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-4xl',
    'text-8xl',
    'max-w-none',
    'bg-light-blue',
    'bg-medium-blue',
    'bg-blue',
    'bg-dark-blue',
    'text-cyan',
    'text-blue',
    'text-light-blue',
    'text-medium-blue',
    'text-dark-blue',
    'text-align-center',
    'text-align-right',
    'text-align-left',
    'flex-row',
    'flex-col',
    {
      pattern: /prose/,
    },
    // Support classes added by Styles in CKEditor5 and by component configurations
  ],
}