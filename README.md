# validatorjs-webpack-plugin

![npm](https://img.shields.io/npm/v/validatorjs-webpack-plugin.svg?style=for-the-badge) ![license](https://img.shields.io/github/license/julianburr/validatorjs-webpack-plugin.svg?style=for-the-badge)

## Usage

```bash
yarn add validatorjs-webpack-plugin --dev

#or
npm i validatorjs-webpack-plugin --dev
```

In your webpack config:

```js
const ValidatorjsPlugin = require('validatorjs-webpack-plugin');

module.exports = {
  plugins: [
    // To remove all locales except for "en"
    new ValidatorjsPlugin({ localesToKeep: ['en'] })
  ],
};
```

## Why?

Because [`validatorjs`](https://github.com/skaterdav85/validatorjs) comes with a bunch of locale files for translations in many languages. It's very likely you don't actually use all of those, and they take up most of the bundle size, which ends up bloating your bundles.

## What does it do?

It removes all languages that you don't need from the bundle. It adds a simple rule for webpacks `IgnorePlugin` as describes [in this issue posted on the validatorjs repo](https://github.com/skaterdav85/validatorjs/issues/220).

I mainly decided to move it into a package so I wouldn't need to copy/paste the rule into all the projects 😅

This was heavily inspired by the [`moment-locales-webpack-plugin`](https://github.com/iamakulov/moment-locales-webpack-plugin), which does a similar thing for the moment js library.