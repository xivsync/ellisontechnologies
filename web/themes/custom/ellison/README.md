# Ellison Technologies

This is a theme built with Storybook, Tailwind, Components, and Twig hosted by Pantheon.

## Approach to ellisontechnologies

@todo

## Pantheon

Ellison Technologies uses Pantheon, it should be noted that Code move from Dev to Live. But Databases and Files move down from Live to Dev. It is recommended to keep Dev and Test up to date with Live to make updating configurations easier.

## Environments - Dev, Test, Live

@todo

## Visual Code Studio

- Twig and Twig Language 2
- Prettify
- ES Lint
- Drupal Syntax Highlighting
- Tailwind CSS IntelliSense

## Development workflow (assumes 1 developer working at a time)

Please note that the `master` branch always goes from Dev to Test to Live. Database changes always go from Live to Test and Dev. You can not push database changes from a lower environment to Live.

- open root folder
- `colima start --dns 1.1.1.1` (use colima rather than Docker Desktop)
- `ddev start`
- `ddev drush user:login` will get you a onetime link to login as `admin` locally
- `git fetch origin` then `git pull` the `master` branch (at this time ellisontechnolgies does not use Multidev environments)
- update Test and Dev with Live databases
- download the most recent backup of the Live environment and `ddev import-db --src=ellisontechnologies_dev_2023-08-22T16-12-11_UTC_database.sql`
- `ddev cex` will export all the Live configs which should overwrite all your local configs
- make changes
- in the theme folder run `npx tailwindcss -i ./components/tailwind.css -o ./components/00-base/tailwind/_tailwind.scss` to build the `tailwind.scss` file
- then in the theme folder run `npm run build` to build files including `tailwind.scss`
- commit changes to `master`
- when ready `git push`
- DO NOT USE SMTP to make changes to the code
- Test on Dev environment
- When ready merge to Test
- Now have the client UAT on Test
- When ready merge to Production

@todo review dev twig and file cache clear



## Get ellisiontechnolgies repo from Pantheon

This process requires Composer version 2.2 and uses Pantheon's current PHP 8.1 version.

https://getcomposer.org/doc/01-basic-usage.md

Get access to `ellisontechnologies` site from Trinet Solutions

Clone the site locally with Git.

https://docs.pantheon.io/guides/git/git-config#clone-your-site-codebase

Example:

`git clone ssh://codeserver.dev.75e50b27-8f70-47d0-80c7-412596acb0f7@codeserver.dev.75e50b27-8f70-47d0-80c7-412596acb0f7.drush.in:2222/~/repository.git -b master ellisontechnologies`

You will get ONLY the files used to customize Drupal 10. You will need to now install D10 in order to develop locally.

https://docs.pantheon.io/drupal-from-dist#add-files-and-folders

### --- @TODO: Test to see if below is needed.

Enter the root directory of your repo.

`cd ellisontechnologies`

Then run ALL following Composer command line commands.

Copy the upstream-configuration folder to your site:

`cp -r /drupal-composer-managed-path/upstream-configuration`

Copy the pantheon.upstream.yml file to your site:

`cp  /drupal-composer-managed-path/pantheon-upstream.yml .

Make the config directory

`mkdir -p config .`

Visit the link below to modify settings in composer.json, replacing the Drupal values with the latest version:

https://docs.pantheon.io/drupal-from-dist#update-composer-settings

Update settings.php

https://docs.pantheon.io/drupal-from-dist#update-settingsphp

Initialize, push and test.

https://docs.pantheon.io/drupal-from-dist#initialize-push-and-test

Watch the build in the Dev dashboard -- if it turns "red" it means there was a build issue. Check the logs to identify the problem.

### --- @endtodo

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

Backup the Live site using Pantheon's dashboard and then move the `.gz` or `.sql` file to the root folder and run `import-db`. This is more reliable than running `ddev pantheon pull`.

https://ddev.readthedocs.io/en/latest/users/usage/database-management/

`ddev import-db --src=ellisontechnologies_dev_2023-08-22T16-12-11_UTC_database.sql`

## To get files

Backup the Live site using Pantheon's dashboard and then download and you can replace all the folders and files in `/web/sites/default/files/`. This will give you all the production images in your local environment. This is more reliable than running `ddev pull pantheon`.

## Emulsify Drupal

It is based on Emulsify which is an open-source tool for creating design systems with reusable components and clear guidelines for teams.

Emulsify provides a Storybook component library using Tailwind and a Webpack development environment.

- Base font-size is 16px or 1rem
- Spacing typically is 2rem
- Spacing between components uses `flex gap-8` then add `mb-8` when needed
- Custom colors blue, light-blue, and dark-blue defined in tailwind.js

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

## Development Workflow

To build the `_tailwind.scss file`, in the theme root folder run this **Tailwind CLI** command to generate the css file.

Then in the theme root folder run this **NPM script** to generate the theme `/dist/css/style.css`. This is the file added to the global theme library. It includes Tailwind base (CSS reset), all the Tailwind styles found in Components and Templates, and all the Emulsify styles found also in Components and Templates.

### Steps

Build the Tailwind file (@todo: eventually this should build the `style.css` file in the `/dist/` folder)

`npx tailwindcss -i ./components/tailwind.css -o ./components/00-base/tailwind/_tailwind.scss`

Build the theme to create the `/dist/css/` and `/dist/js/` files added by `ellison.libraries.yml`

`npm run build`

Build the production theme

`npm run build --production`

@todo add `npm run delevelop`

### Documentation

[docs.emulsify.info](https://docs.emulsify.info/)

[Webpack](https://webpack.js.org/)

[storybook.js.org](https://storybook.js.org/)

[tailwindcss.com](https://tailwindcss.com/)

### Paragraph Library resusable components

If paragraph components are `promoted to library`, then they can be reused elsewhere including directly in Twig templates.

To change a library paragraph is to make a change to all instances.

If needed, a Library paragraph can be `unlinked`. Then changes are isolated to that instance of the paragraph.

Paragraphs in the library are used in the twig templates and titled **Code Component:**.

The libarary has many re-used components, so follow this naming convention:

* Basic Page Component: a paragraph reused on basic pages.
* Code Component: a paragraph that is used in Twig templates.
* Model Component: a paragraph that is used on model pages. All model compents have an ID taken from the legacy site.

The workflow for promoting a library item and then re-using it is as follows:

* Find a model (or basic page)
* Create the first instance of the componet to be re-used
* Save the page
* Now on that component you can `promote to library`
* Save the page
* Goto Conent > Paragraphs and you should see your component listed with a garbage title
* Edit component and add a title following the above guidelines
* Save component
* Now you can go to the next model (or basic page) and add a re-usable library component by searching for the title (see above title)
* Save page

## Author

Tim Bednar is the initial developer for ellisontechnologies site, theme, and custom modules.

Emulsify&reg; is a product of [Four Kitchens &mdash; We make BIG websites](https://fourkitchens.com).