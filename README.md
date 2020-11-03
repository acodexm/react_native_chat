# React Native Typescript RxJS Firebase Chat

Fully reactive firebase chat app


## Overview

### Features

- Includes all the libraries you need to get going right away (react-navigation, styled-components, react-native-dotenv, react-native-vector-icons)
- Allows you to quickly generate and scaffold components, screens, navigators, models & more form an intuitive CLI generator
- TDD with Storybook, Jest & E2E testing configured out of the box
- Includes both firebase and firebase authentication
- Clear folder structure that favours convention over configuration

### Getting Started

1. Clone the repo locally
2. Run `yarn`
3. Run `npx react-native-rename [name] -b [bundle identifier]`
4. Run `rm -rf .git && git init`
5. Update the `name` in the package.json
6. Follow [firebase setup instructions](https://rnfirebase.io)
7. Commit & Profit

### Structure

The app has a rigid structure, which means if you decide to change things around; some things won't work right out of the box.

The advantage of this is you don't have to spend time thinking about where to put things/how to name things since the boilerplate does it for you.

The generators assume your app is using this structure. You can customize the generators if your app is using an alternative structure e.g. domain based structure

```bash
├── generators # All of the different generators live here
|   ├── templates
|   └── utils
├── src
├── test
|   ├── models
|   ├── repositories
|   ├── services
|   ├── support # Test helper/mock files
|   ├── views
|   └── setup.ts
├── storybook
|   ├── stories.ts # Registers all of the .story.tsx files
|   └── index.ts
├── plopfile.ts # Generator entry file
└── index.js # The entry point for the app
```

#### generators

This directory houses all of the code for the different generators. The generators are built using [plop.js](https://plopjs.com) and the templates use handlebars.

If you wish to customize a generator you can do so by modifying the `generators/templates` folder for the specific generator you want to change.

If you wish to add a generator, just create a new file with the name of the generator in `/generators` and include that in the `plopfile.ts` like so

```tsx
import myCoolGenerator from './generators/my-cool-generator';

plop.setGenerator('coolThing', myCoolGenerator);
```

#### src

The src directory is structured like so:

```bash
├── assets
|   ├── images
|   └── fonts
├── components
├── lib
|   ├── hooks
|   ├── i18n
|   ├── setup
|   └── typings
├── models
├── navigation
|   ├── actions
|   └── navigators
├── services
├── theme
├── utils
├── views
└── app.tsx
```

##### components

All of your custom components live here. The generator will automatically place any new components into this file.

Each component is split into four files and stored in their own directory

1 component.tsx

This is the actual file for the component. You wil write most of your code here.

2 component.test.tsx

Tests for the component.

3 component.story.tsx

This file houses the [story](https://storybook.js.org/docs/basics/writing-stories/) for your component.

You can skip out on generating this file by saying no to the `Do you want to generate a story?` prompt in the CLI.

4 component.styled.ts

Finally, this file houses the [styled components](https://www.styled-components.com) that belong to the main component file.

#### Lib

This folder is home to several sub-folders.

##### Hooks

Contains any custom hooks you may have in your application.

By default, a `useStore` hook is included to give your functional components access to the MobX root store.

You can remove this file and setup your own implementation if you wish

##### i18n

This folder contains code related to localization, allowing you to translate your app easily.

There is a folder for your `locales` in which you define your strings for each language.

You can use the defined strings easily like so (thanks to babel-plugin-module-resolver):

```ts
import { t } from '@i18n';

t('my.awesome.key');
```

##### Setup

This folder is inspired by the rails `config/initializers` which houses code that will be ran when your app is initialized.

You can use this folder to write code that will be executed before the `app.tsx` is rendered.

By default, `react-native-gesture-handler` and `react-native-screens` are included in the setup folder.

You may want to include things like `GoogleSignIn.configure` or `Stripe.configure` here.

Make sure to import each setup file in the `lib/setup/index.ts`.

##### Typings

This folder houses any custom typescript type declaration files.

### Models

This folder is home to all of your MST (MobX State Tree Models). Models can be auto generated using `yarn g model [name]` and you can pass a set of attributes to the CLI generator.

The models are declared using ES6 Classes and decorators thanks to [mst-decorators](https://github.com/farwayer/mst-decorators)

You can learn more about [MobX State Tree here](https://github.com/farwayer/mst-decorators)

### Navigation

This folder houses all code that relates to react-navigation.

The navigators live in their own separate folder and so do navigation actions.

### Store

This folder stores all of your stores. A store is responsible to keep and share state between components reactively.

An example of a store can be seen here:

```ts
type AppStoreState = {
  firstLaunch: boolean;
};

const initialAppStoreState: AppStoreState = {
  firstLaunch: true,
};
const APP_FIRST_LAUNCH = 'APP_FIRST_LAUNCH';
export default class AppStore {
  static getInstance() {
    if (!this.instance) {
      Log.debug('AppStore init');
      this.instance = new AppStore();
    }
    return this.instance;
  }

  private state: BehaviorSubject<AppStoreState>;
  private static instance: AppStore;

  constructor() {
    this.state = new BehaviorSubject<AppStoreState>(initialAppStoreState);
  }
  initializeApp = async () => {
    const firstLaunch = await load(APP_FIRST_LAUNCH);
    this.state.next({ firstLaunch });
  };
  firstLaunchDone = () => {
    save(APP_FIRST_LAUNCH, false);
    this.state.next({ firstLaunch: false });
  };
  firstLaunch = () => this.state.pipe(map(({ firstLaunch }) => firstLaunch));
}
```

### Services

Each service file encapsules some re-usable business logic.
Services can also be generated by running `yarn g service [name]`

### Theme

The theme folder contains code related to global application styles (fonts, colors, navigation styles, metrics) etc. It makes it easy to change things like font-family, primary colors without having to change every single react native component.

### Utils

Houses re-usable utility functions.

### Views

Views are screens displayed to the end user. Views themselves should be quite simple, composed of several different components.

Views are housed in their own folder in a similar fashion to components, but, without the `props` or `story` files.

You can also generate views using the CLI.

## Naming Conventions

- File names use `kebab-case`
- Classes use `PascalCase`
- Instance variables/js variables use `camelCase`

You can opt out of these naming conventions by modifying the generator files and renaming the auto generated files yourself.

## Generators

All generators are powered by the [plop.js](https://plopjs.com) library. The generators automatically format (using Prettier) and fix (using ESlint) your code, to save you those precious seconds.

### Component Generator

To generate a functional component, simply run

```bash
yarn generate component [name]
yarn g component [name] # you can use the shorthand
```


### View Generator

```bash
yarn g view [name]
```


### Model Generator

To generate a MST Model run:

```bash
yarn g model [name]
```


### Navigator Generator

To create a `react-navigation` navigator, run

```bash
yarn g navigator [name]
```

### Service Generator

`yarn g service [name]`
