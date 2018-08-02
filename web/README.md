This is the source code to the [Monster Hunter World Canteen Checklist web application](https://alexcpendleton.github.io/mhworld-canteen/). The goal of the app is to keep track of the Canteen ingredients you've found, and help you find those you're missing by grouping them by zone. You are welcome to contribute data changes or features if you'd like to.

# Table of Contents

- [Overview](#overview)

## Overview

This is a React single page app (bootstrapped with create-react-app), and currently all the data is hardcoded into [./web/data/ingredients.json](./web/data/ingredients.json). State is persisted using `localStorage` for simplicity, there are no plans to introduce server-side state at this time.

Yarn is used for package management.

## Getting the source

```sh
git clone git@github.com:alexcpendleton/mhworld-canteen-checklist.git
cd mhworld-canteen-checklist/web
```

## Build

```sh
cd web
yarn start
```

## Deploy

You probably won't be doing this, but it's here because I will forget. I'll likely set up an automatic deployment at some point.

```sh
cd web
yarn deploy
```
