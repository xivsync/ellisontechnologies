# Ellison Technologies Drupal 10

This is a theme built with Storybook, Tailwind, Components, and Twig hosted by Pantheon.

## Approach to ellisontechnologies

@todo

## Pantheon

Ellison Technologies uses Pantheon, it should be noted that Code move from Dev to Live. But Databases and Files move down from Live to Dev. It is recommended to keep Dev and Test up to date with Live to make updating configurations easier.

### How to develop using SFTP mode (strongly not recommended)

If local development is not ideal, then use SFTP to develop directly on Pantheon Dev environment. This option takes the least time to get set up.

https://docs.pantheon.io/guides/sftp

### Develop locally using GIT Development mode and DDEV

This assumes you've already setup local development using DDEV (see below).

Please note that the `master` branch always goes from Dev to Test to Live. Database changes should go from Live to Test and Dev. You **should not** push database changes from a lower environment to Live.

- open root folder
- `colima start --dns 1.1.1.1 --cpu 4 --memory 8`
- `ddev start`
- `ddev drush user:login` will get you a onetime link to login as `admin` locally
- `git fetch origin` then `git pull` the `master` branch (at this time ellisontechnolgies does not use Multidev environments)
- update Test and Dev with Live databases
- download the most recent **database backup of the Live environment** and `ddev import-db --src=ellisontechnologies_dev_2023-08-22T16-12-11_UTC_database.sql`
- `ddev cex` will export all the **Live configs** which should overwrite all your local configs.
- It is critical to observe the changed configs as the client may have updated some configs (i.e. webforms) in the Live database. It is critical to pay attention to NOT regressing configs, or you may undo Live changes (i.e. revert changes or delete a webform).
- make changes
- in the theme folder run `npm run tailwind`
- in the theme folder run `npm run ckeditor` (rarely needed)
- run a `ddev drush cex -y` to export any configuration changes and review and commit ONLY the needed configs
- commit changes to `master` which includes the config files and all of the built files
- when ready `git push`
- after code changes are on Dev download the Live database
- in Drupal admin go to **Configurations > Development > Synchronize** and click the "Import all" to update the Live database you just copied down with any configuration changes in order to test changes and regressions like webforms.
- review on Dev environment
- When ready merge to Test using Pantheon tools by ALWAYS copying down the Live database and files
- after code is on Test in Drupal admin go to **Configurations > Development > Synchronize** and click the "Import all" to update the Live database you just copied down with any configuration changes in order to test changes and regressions like webforms
- Now have the client UAT on Test
- When ready merge to Production using Pantheon tools
- it is recommended at this point to create a backup of the Live site incase the configuration import does not work as expected
- after code is on Live in Drupal admin go to **Configurations > Development > Synchronize** and click the "Import all" to update the Live database you just copied down with any configuration changes in order to test changes and regressions like webforms

### How to start developing locally using DDEV (Mac only instructions)

Get access to `ellisontechnologies` site from Trinet Solutions. And make sure that **Development Mode is set to Git not SFTP**.

### Recommended Visual Code Studio extensions

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
- Using Pantheon Dashboard clone repo with the command provided by Pantheon
- `cd ellisontechnologies`
- `ddev config`
- `ddev composer require drush/drush`
- `colima start --dns 1.1.1.1 --cpu 4 --memory 8`
- `dev start`
-  `ddev pull pantheon` **this usually fails** so proceed with below to manually import dashboard and files from Dev
- Using Pantheon Dashboard download backups of files and database from Dev
- Move database to rootdirectory
- `ddev import-db --file=ellisontechnologies_dev_2024-02-23T17-54-32_UTC_database.sql.gz`
- unzip folder and replace all files in `web/sites/default/files`
- `ddev drush cr`
- `ddev start`

Unless you have tons of CPU/Memory, it is recommanded to turn off Docker Desktop. More on colima [here](https://ddev.readthedocs.io/en/latest/users/docker_installation/#macos-installation-colima)

### Configs

Any time you fetch origin to local in Drupal admin go to **Configurations > Development > Synchronize** and click the "Import all" to update the Live database you just copied down with any configuration changes in order to test changes and regressions like webforms.

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

**Ellison** is based on Emulsify which is an open-source tool for creating design systems with reusable components and clear guidelines for teams.

Emulsify provides a Storybook component library using Tailwind and a Webpack development environment.

- Base font-size is 16px or 1rem
- Spacing typically is 2rem
- Spacing between components uses `flex gap-8` then add `mb-8` when needed
- Custom colors blue, light-blue, and dark-blue defined in tailwind.js

### Getting started with the Ellison Theme

- `nvm install 20.11.1`
- `nvm use 20.11.1`
- `npm install`

#### Storybook

@todo

Storybook is a frontend tool that aids in the building UI components for Ellison. To build and view Storybook components,

`npm run storybook`

Then it you can view the Storybook page here locally.

http://localhost:6006/  

@todo: Then when you want to publish it to Chromatic which hosts it for free.

`npx chromatic --project-token=43d2cc2631ac`

#### Tailwind

Tailwind CSS works by scanning themes Templates and Component folders finding the corresponding styles and then writing them to a static CSS file.

`/ellison/components/tailwind/_tailwind.scss`

This is a bit janky. So Tailwind CLI builds the Tailwind SCSS file then the normal Emulsify build commands build everything into the theme `/dist/style.css` file.

@todo improve build process

## Theme development workflow

Build the Tailwind file and build the theme files needed for `/dist/css/` and `/dist/js/` files referenced by `ellison.libraries.yml`. **Both source and distributed files need to committed.**

`npm run tailwind`

To build the CK editor stysheet

`npm run ckeditor`

Build the production files

`npm run build --production`

@todo add `npm run delevelop`

## CSS

### CK Editor Styles

- Add a style to both Basic and Full text editor formats `/admin/config/content/formats`
- It is best to just add a Tailwind utilitiy like `mb-0`
- Then make sure the Tailwind selector is added to the list in `tailwind.config.js` so it is added by postcss to your style.css file
- The same process applies to `Link Styles` which allows you to add buttons or styled links.
- Note once you add a style remember the class is hardcoded into the content.

`npm run ckeditor` generates the file used by CKeditor.

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

### Responsive images

@todo model images are `1140x842`

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

When creating content **you can select 1 or more styles to a paragraph or heading**.

Creators should pay attention to NOT repeating the same type of style on an element. For instance, do not apply H2 Larger and H2 Largest or Paragraph Blue and Paragraph Light Blue. Apply 1 color and 1 size and one margin to an element.

### Paragraph Library resusable components

If paragraph components are `promoted to library`, then they can be reused elsewhere including directly in Twig templates.

- To change a library paragraph is to make a change to all instances.
- If needed, a Library paragraph can be `unlinked` which then all changes to that component unique.

Paragraphs in the library are used in the twig templates and titled **Code Component**. The libarary has many re-used components, so follow this naming convention:

* **Basic Page Component**: a paragraph reused on basic pages
* **Code Component**: a paragraph that is used in Twig templates by developers
* **Model Component**: a paragraph that is used on model pages. All model compents have an ID taken from the legacy site

The workflow for promoting a library item and then re-using it is as follows:

* Find a model (or basic page)
* Create the first instance of the componet to be re-used
* Save the page
* Now on that component you can `promote to library`
* Save the page
* Goto Conent > Paragraphs and you should see your component listed with a garbage title
* **Edit component and add a title following the above guidelines**
* Save component
* Now you can go to the next model (or basic page) and add a re-usable library component by searching for the title (see above title)
* Save page

## Users selected location also called regions

- the first time a visitor comes to the site, they should get a modal form to select a location.
- the location information (region term name, region term ID, and Salesforce region ID) are saved both to a cookie `ellison_region` and to `drupalSettings.ellison`
- `drupalSettings.ellison.region_id` is used on the Location page filter the locations based on users selection
- `drupalSettings.ellison.region_id` is used on the Contact us page filter the locations on the right sidebar based on users selection
- `drupalSettings.ellison.region_sf_id` is used to populate the `region__c` form input whenever it is used

**Salesforce region IDs**

308|(308) Minnesota
210|(210) Northwest - Oregon
307|(307) Wisconsin
320|(320) TriStates - Iowa/NE
355|(355) Ohio - Cincinnati
219|(219) Northern California
218|(218) Southern California
450|(450) Southeast - Nashville
304|(304) Illinois
340|(340) Indiana

## Search

Ellison Technologies uses the Search API and Search API Pages to handle search. The core Search module is turned off. The search box in the navigation is a simple form. It does not use a block. The search indexing runs each time the Cron is run. So content is not indexed immediately.

Phrases like `"blue house"` look for any match for `blue` and `house`. Phrase indexing is NOW turned on so it will items that contain the word “blue” immediately followed by the word “house”.

## Email set up

https://docs.sendgrid.com/for-developers/sending-email/drupal

https://login.sendgrid.com/
Account: trinetdev3@trinetsolutions.com (get password from Trinet)

Ellison IT authenticated it's domain via DNS and uses webcontact@ellisontechnologies.com to send all emails

webcontact@ellisontechnologies.com is the system email.

### Configuration

https://test-ellisontechnologies.pantheonsite.io/admin/config/services/sendgrid

- SendGrid API Key Name: EllisonMarch12024
- Drupal Key Name: ellisonmarch12024 (where the SendGrid API Key is saved)
- Mail system uses Sendgrid Integration (not SMTP) as well as for Formatting HTML

### Troubleshooting

**If emails are not being received**, one potential cause is Ellison blocking. You can audit email sending by logging into Sendgrid > Activity (make sure you click show all activity).

`550 Rejected by header based Anti-Spoofing policy: webcontact@ellisontechnologies.com - https://community.mimecast.com/docs/DOC-1369#550 [aUT_rCR5NlOVu3zyNjaM8g.us516]`

## Webforms

- Build a Quote is not a Drupal webform and uses a script to integrate with Call Tracking Metrics
- Contact us uses a script to integrate with Call Tracking Metrics

In both cases above, CTM sets several values in Salesforce which are required.

### Salesforce Mapping

### Pardot

Assigning regions are handled by the **Pardot form handler**. The Drupal Locations webform handler sets both `ellison_region` cookie and `drupalSettings.ellison` values. The follow numbers are sent to Salesforce so that Region is properly assigned.

308|(308) Minnesota
210|(210) Northwest - Oregon
307|(307) Wisconsin
320|(320) TriStates - Iowa/NE
355|(355) Ohio - Cincinnati
219|(219) Northern California
218|(218) Southern California
450|(450) Southeast - Nashville
304|(304) Illinois
340|(340) Indiana

Campaigns for events are set by Pardot.

Newsletter campaign is set by the Drupal webform values for opt-in.

## Connected App

See the details in the configuration files.

## SalesForce Module

Using the Salesforce Suite contributed module, you can create a mapping to send webform data to Salesforce.

https://www.drupal.org/docs/8/modules/salesforce-suite/introduction-and-terminology
https://www.drupal.org/docs/contributed-modules/salesforce-suite/salesforce-webform

A list of mappings can be found here Stucture > Salesforce > Salesforce Mappings

https://live-ellisontechnologies.pantheonsite.io/admin/structure/salesforce/mappings

Any data sent to Salesforce is listed here in Salesforce Mapped Objects.

https://live-ellisontechnologies.pantheonsite.io/admin/content/salesforce

## Call Tracking Metrics

The custom webform handler is not being used.

All integration with CTM is handled by a script added to the page which listens to the form submission.

## Author

Tim Bednar is the initial developer for ellisontechnologies site, theme, and custom modules.

Emulsify is a product of [Four Kitchens &mdash; We make BIG websites](https://fourkitchens.com).