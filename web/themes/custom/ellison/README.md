# Ellison

This is a theme built with Storybook, Tailwind, Components, and Twig.

## Emulsify Drupal

It is based on Emulsify which is an open-source tool for creating design systems with reusable components and clear guidelines for teams.

Emulsify provides a Storybook component library using Tailwind and a Webpack development environment.

## Getting started

npm install

### Storybook

Storybook is a frontend tool that aids in the building UI components for Ellison. To build and view Storybook components,

`npm run storybook`

Then it you can view the Storybook page here locally.

http://localhost:6006/  

@todo: Then when you want to publish it to Chromatic which hosts it for free.

`npx chromatic --project-token=43d2cc2631ac`

### Tailwind

Tailwind CSS works by scanning the themes Templates and Component folders finding the corresponding styles and then writing them to a static CSS file.

`/ellison/components/tailwind/_tailwind.scss`

## Workflow

To build the `_tailwind.scss file`, in the theme root folder run this **Tailwind CLI** command to generate the css file.

Then in the theme root folder run this **NPM script** to generate the theme `/dist/css/style.css`. This is the file added to the global theme library. It includes Tailwind base (CSS reset), all the Tailwind styles found in Components and Templates, and all the Emulsify styles found also in Components and Templates.

### Steps

Build the Tailwind file (@todo: eventually this should build the `style.css` file in the `/dist/` folder)

`npx tailwindcss -i ./components/tailwind.css -o ./components/00-base/tailwind/_tailwind.scss`

Build the theme to create the `/dist/css/` and `/dist/js/` files added by `ellison.libraries.yml`

`npm run build`

Build the production theme

`npm run build --production`

@todo add watch

### Documentation

[docs.emulsify.info](https://docs.emulsify.info/)

[Webpack](https://webpack.js.org/)

[storybook.js.org](https://storybook.js.org/)

[tailwindcss.com](https://tailwindcss.com/)
### Usage

## Author

Emulsify&reg; is a product of [Four Kitchens &mdash; We make BIG websites](https://fourkitchens.com).