# Ellison

This is a theme built with Storybook, Tailwind, Components, and Twig.

## Pantheon

Ellison Technologies uses Pantheon, it should be noted that Code move from Dev to Live. But Databases and Files move down from Live to Dev. It is recommended to keep Dev and Test up to date with Live to make updating configurations easier.

## Create D10 sites

This process requires Composer version 2.2 and uses Pantheon's current PHP version.

https://getcomposer.org/doc/01-basic-usage.md

Get access to `ellisontechnologies` site from Trinet Solutions

Clone the site locally with Git.

https://docs.pantheon.io/guides/git/git-config#clone-your-site-codebase

`git clone ssh://codeserver.dev.75e50b27-8f70-47d0-80c7-412596acb0f7@codeserver.dev.75e50b27-8f70-47d0-80c7-412596acb0f7.drush.in:2222/~/repository.git -b master ellisontechnologies`

You will get ONLY the files used to customize Drupal 10. You will need to now install D10 in order to develop locally.

https://docs.pantheon.io/drupal-from-dist#add-files-and-folders

Enter the root directory of your repo. Then run ALL following Composer command line commands.

Copy the upstream-configuration folder to your site:

`cp -r /drupal-composer-managed-path/upstream-configuration`

Copy the pantheon.upstream.yml file to your site:

`cp  /drupal-composer-managed-path/pantheon-upstream.yml .

`mkdir -p config .`

Visit the link below to modify settings in composer.json, replacing the Drupal values with the latest version:

https://docs.pantheon.io/drupal-from-dist#update-composer-settings

Update settings.php

https://docs.pantheon.io/drupal-from-dist#update-settingsphp

Initialize, push and test

https://docs.pantheon.io/drupal-from-dist#initialize-push-and-test

Watch the build in the Dev dashboard -- if it turns "red" it means there was a build issue. Check the logs to identify the problem.

## Develop locally using DDEV

Now you can run `composer install`.

It result in getting Core D10 and all the Core modules and what ever else is required by the Composer file.

Your local repo will now look like a complete D10 site. Note that when you push to Pantheon's git repo, you're only pushing the `composer.json` and `composer.lock` plus your custom modules and themes. Every time you push to Pantheon's git, it will run composer.json.

Read the documentation below to set up your local machine. These instructions are specifically for Pantheon and DDEV.

https://ddev.readthedocs.io/en/latest/users/providers/pantheon/

When you `ddev pull pantheon` it should hook up everything. Then `ddev drush cr` and you should be ready to go.

## Configs

Right now configs are manually sync'd using the Configuration > Development > Configuration Sync > Import/Export. It is recommended that you develop using the latest database, and then use `ddev drush cex` to export any config changes you made locally to support your code changes.

## To import database

Backup the Live site using Pantheon's dashboard and then move the `.gz` file to the root folder and run `import-db`. This is more reliable than running `ddev pantheon pull`.

https://ddev.readthedocs.io/en/latest/users/usage/database-management/

`ddev import-db --src=ellisontechnologies_dev_2023-07-10T16-24-44_UTC_database.sql.gz`

## To get files

Backup the Live site using Pantheon's dashboard and then download and you can replace all the folders and files in `/web/sites/default/files/`. This will give you all the production images in your local environment. This is more reliable than running `ddev pull pantheon`.

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