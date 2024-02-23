# Ellison Technologies

This is a theme built with Storybook, Tailwind, Components, and Twig hosted by Pantheon.

## Approach to ellisontechnologies

@todo

## Pantheon

Ellison Technologies uses Pantheon, it should be noted that Code move from Dev to Live. But Databases and Files move down from Live to Dev. It is recommended to keep Dev and Test up to date with Live to make updating configurations easier.

### How to develop using SFTP mode

If local development is not ideal, then use SFTP to develop directly on Pantheon Dev environment. This option takes the least time to get set up.

https://docs.pantheon.io/guides/sftp

### How to develop locally using GIT Development mode and DDEV

This assumes you've already setup local development using DDEV (see below).

Please note that the `master` branch always goes from Dev to Test to Live. Database changes always go from Live to Test and Dev. You can not push database changes from a lower environment to Live.

- open root folder
- `colima start --dns 1.1.1.1 --cpu 4 --memory 8`
- `ddev start`
- `ddev drush user:login` will get you a onetime link to login as `admin` locally
- `git fetch origin` then `git pull` the `master` branch (at this time ellisontechnolgies does not use Multidev environments)
- update Test and Dev with Live databases
- download the most recent backup of the Live environment and `ddev import-db --src=ellisontechnologies_dev_2023-08-22T16-12-11_UTC_database.sql`
- `ddev cex` will export all the Live configs which should overwrite all your local configs
- make changes
- in the theme folder run `npm run tailwind`
- in the theme folder run `npm run ckeditor` (rarely needed)
- commit changes to `master` which includes the built files
- when ready `git push`
- Test on Dev environment
- When ready merge to Test using Pantheon tools 
- Now have the client UAT on Test
- When ready merge to Production using Pantheon tools

### How to start developing locally using DDEV (Mac)

Get access to `ellisontechnologies` site from Trinet Solutions. And make sure that **Development Mode is set to Git not SFTP**.

### Visual Code Studio extensions

- Twig and Twig Language 2
- Prettify
- ES Lint
- Drupal Syntax Highlighting
- Tailwind CSS IntelliSense

### Install the following (Mac)

- Install homebrew
- Install nvm
- Install latest node/npm
- `brew install docker` and you can additional install Docker Desktop
- `brew install colima`
- `brew install ddev/ddev/ddev`
- `brew install --cask git-credential-manager`

https://ddev.readthedocs.io/en/latest/users/providers/pantheon/#pantheon-quickstart

- Create machine token in Pantheon
- Add machine token to .ddev/global-config.yaml
- Using Pantheon Dashboard update Dev database and then create a backup for Dev
- Add ssh key to ssh keys in Pantheon https://docs.pantheon.io/ssh-keys
- `cd` into project root folder
- Using Pantheon Dashboard clone repo i.e. `git clone ssh://codeserver.dev.75e50b27-8f70-47d0-80c7-412596acb0f7@codeserver.dev.75e50b27-8f70-47d0-80c7-412596acb0f7.drush.in:2222/~/repository.git -b master ellisontechnologies`
- `cd ellisontechnologies`
- `ddev config`
- `ddev composer require drush/drush`
- `colima start --dns 1.1.1.1 --cpu 4 --memory 8`
- `dev start`
-  `ddev pull pantheon` this usuall fails so proceed with below to manually import dashboard and files from Dev
- Using Pantheon Dashboard download backups of files and database from Dev
- Move database to rootdirectory
- `ddev import-db --file=ellisontechnologies_dev_2024-02-23T17-54-32_UTC_database.sql.gz`
- unzip folder and replace all files in `web/sites/default/files`
- `ddev drush cr`
- `ddev restart`
- `ddev launch` to start site in browsery

  Unless you have tons of CPU/Memory, it is recommanded to turn off Docker Desktop.
  More on colima [here](https://ddev.readthedocs.io/en/latest/users/docker_installation/#macos-installation-colima)

@todo implement configs

- `ddev updb -y`
- `ddev drush cr`
- `ddev drush cim -y`
- `ddev drush cr`

### Configs

Right now configs are manually sync'd using the Configuration > Development > Configuration Sync > Import/Export. Do this for all required configurations. If you start development from a current database, then Configuration > Development > Configuration Sync will notify you of what changed.

- Make a configuration change, then Configuration > Development > Configuration Sync > Export > Single Item
- Then in Dev, Test, Live Configuration > Development > Configuration Sync > Import > Single Item

### To import database

Backup the Live site using Pantheon's dashboard and then move the `.gz` or `.sql` file to the root folder and run `import-db`. This is more reliable than running `ddev pantheon pull`.

https://ddev.readthedocs.io/en/latest/users/usage/database-management/

`ddev import-db --src=ellisontechnologies_dev_2023-08-22T16-12-11_UTC_database.sql`

### To get files

Backup the Live site using Pantheon's dashboard and then download and you can replace all the folders and files in `/web/sites/default/files/`. This will give you all the production images in your local environment. This is more reliable than running `ddev pull pantheon`.

### Useful DDEV commands

If you need to get a one time password from the dev environment.

`ddev auth ssh` to your local container

From there you can run Terminus Drush commands locally or on the Pantheon Dev environment.

To login to Pantheon..

`terminus auth:login --...machinetoken...`

Then you can use your drush command telling it what site and environment,

`terminus drush ellisontechnologies.dev user:login`

If you are asked for your password, it refers to your Pantheon user and password. Or you can set up tokens.

Expected output is just like if you `ddev drush user:login` locally except with terminus you can run drush commands in the dev environment.

`http://dev-ellisontechnologies.pantheonsite.io/user/reset/1/1693431127/hjwrSk6lRdXqyvezneblbLAcLgBCWyWt3yXPLAqnPGY/login`

You can now vist that link and login to Dev.

## Emulsify Drupal Theme

It is based on Emulsify which is an open-source tool for creating design systems with reusable components and clear guidelines for teams.

Emulsify provides a Storybook component library using Tailwind and a Webpack development environment.

- Base font-size is 16px or 1rem
- Spacing typically is 2rem
- Spacing between components uses `flex gap-8` then add `mb-8` when needed
- Custom colors blue, light-blue, and dark-blue defined in tailwind.js

### Getting started with the Ellison Theme

`nvm install 20.11.1`
`nvm use 20.11.1`
`npm install`

#### Storybook

@todo

Storybook is a frontend tool that aids in the building UI components for Ellison. To build and view Storybook components,

`npm run storybook`

Then it you can view the Storybook page here locally.

http://localhost:6006/  

@todo: Then when you want to publish it to Chromatic which hosts it for free.

`npx chromatic --project-token=43d2cc2631ac`

#### Tailwind

Tailwind CSS works by scanning the themes Templates and Component folders finding the corresponding styles and then writing them to a static CSS file.

`/ellison/components/tailwind/_tailwind.scss`

### Theme development overview

To build the `_tailwind.scss file`, in the theme root folder run this **Tailwind CLI** command to generate the css file.

Then in the theme root folder run this **NPM script** to generate the theme `/dist/css/style.css`. This is the file added to the global theme library. It includes Tailwind base (CSS reset), all the Tailwind styles found in Components and Templates, and all the Emulsify styles found also in Components and Templates.

## Theme development workflow

Build the Tailwind file (@todo: eventually this should build the `style.css` file in the `/dist/` folder) and build the theme files needed for `/dist/css/` and `/dist/js/` files referenced by `ellison.libraries.yml`

Both source and distributed files need to committed.

`npm run tailwind`

To build the CK editor stysheet

`npm run ckeditor`

Build the production files

`npm run build --production`

@todo add `npm run delevelop`

## CSS

### Ellison Breakpoints

These are customized from the default Tailwind breakpoints.

```
'sm': '576px',
// => @media (min-width: 640px) { ... }

'md': '768px',
// => @media (min-width: 768px) { ... }

'lg': '992px',
// => @media (min-width: 1024px) { ... }

'xl': '1200px',
// => @media (min-width: 1280px) { ... }

'2xl': '1400px',
// => @media (min-width: 1536px) { ... }
```

### Layout and Spacing

The layout relies on `container mx-auto` to center and provide width to sections. The header, page, breadcrumbs, footer, newsletter and homepage slides all have an extra `xl:px-4` in order to match the size of the old site.

The recommended way to space a components is to use `@apply flex gap-8` to provide internally spacing between elements. If needed add `@appy mb-8` to separate componponents.

### CSS Standards

CSS is based on Tailwind which is mobile first. The goal is to use BEM and `@apply`. For example,

`<div class="component"> ... </div>`

Using Tailwind you could style like this...

`<div class="flex flex-col"> ... </div>`

The preferred way to style this component is to use BEM and the `@apply`. Tailwind utility classes like `mb-8` are utilized by CKEditors custom styles, but otherwide in Twig use BEM and `@apply`.

```
.component {
  @apply flex flex-col;
}
```

The BEM Twig function accepts four arguments, only one of which is required.

Simple block name:

`h1 {{ bem('title') }}`

This creates: `h1 class="title"`

Block with modifiers (optional array allowing multiple modifiers):

`h1 {{ bem('title', ['small', 'red']) }}`

This creates: `h1 class="title title--small title--red"`

Element with modifiers and block name (optional):

`h1 {{ bem('title', ['small', 'red'], 'card') }}`

This creates: `h1 class="card__title card__title--small card__title--red"`

Element with block name, but no modifiers (optional):

`h1 {{ bem('title', '', 'card') }}`

This creates: `h1 class="card__title"`

Element with modifiers, block name and extra classes (optional, in case you need non-BEM classes):

`h1 {{ bem('title', ['small', 'red'], 'card', ['js-click', 'something-else']) }}`

This creates: `h1 class="card__title card__title--small card__title--red js-click something-else"`

Element with extra classes only (optional):

`h1 {{ bem('title', '', '', ['js-click']) }}`

This creates: `h1 class="title js-click"`

## JS

- Add scripts via library
- `npm run tailwind` or `npm run build` to get dist files
- scripts are automatically found if they are located component folders

## Theme documentation

[docs.emulsify.info](https://docs.emulsify.info/)

[Webpack](https://webpack.js.org/)

[storybook.js.org](https://storybook.js.org/)

[tailwindcss.com](https://tailwindcss.com/)

## Updating `.gitignore`

https://dev.to/jafetmeza/how-to-update-your-gitignore-file-325e

`.gitignore` has been updated


It is recommended to rebuild the git cache for ONLY the 

- `git rm -r --cached docroot/themes/custom/onespan/css`
- `git rm -r --cached docroot/themes/custom/onespan/js`
- `git rm -r --cached docroot/themes/custom/onespan/dist`


## Content Creation

### Use styles in CKEditor

To avoid using `style="..."` in the Source of a text field, it is recommended to create a style. Styles are simply one or more classes that can be added to block elements using CKEditor.

**For the developer,**

- Add a style to both Basic and Full text editor formats `/admin/config/content/formats`
- It is best to just add a Tailwind utilitiy like `mb-0`
- Then make sure the Tailwind selector is added to the list in `tailwind.config.js` so it is added by postcss to your style.css file
- The same process applies to `Link Styles` which allows you to add buttons or styled links.
- Note once you add a style remember the class is hardcoded into the content.

**For the content creator,** when creating content you can select 1 or more styles to a paragraph or heading. Creators should pay attention to NOT repeating the same type of style on an element. For instance, do not apply H2 Larger and H2 Largest or Paragraph Blue and Paragraph Light Blue. Apply 1 color and 1 size and one margin to an element.

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

## SMTP

SendGrid is used with the SMPT module under the account with username `trinetdev3@trinetsolutions.com` the password is stored in Keeper.

https://docs.sendgrid.com/for-developers/sending-email/drupal

https://login.sendgrid.com/

@todo document smtp with sendgrid

## Webforms

## Salesforce Mapping

## Pardot

## Connected App


## SalesForce Module

Using the Salesforce Suite contributed module, you can create a mapping to send webform data to Salesforce.

https://www.drupal.org/docs/8/modules/salesforce-suite/introduction-and-terminology
https://www.drupal.org/docs/contributed-modules/salesforce-suite/salesforce-webform

A list of mappings can be found here Stucture > Salesforce > Salesforce Mappings

https://live-ellisontechnologies.pantheonsite.io/admin/structure/salesforce/mappings

Any data sent to Salesforce is listed here in Salesforce Mapped Objects.

https://live-ellisontechnologies.pantheonsite.io/admin/content/salesforce

## Call Tracking Metrics

To send data to Call Tracking Metcis add the CTM Handler to your web form. This handler will send the following fields:

If you need to send other field names, this will require a small code change to add the fields to the CTM handler.

## Author

Tim Bednar is the initial developer for ellisontechnologies site, theme, and custom modules.

Emulsify is a product of [Four Kitchens &mdash; We make BIG websites](https://fourkitchens.com).