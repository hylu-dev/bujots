

# Bujots

_Bullet journaling slimmed down for the web_

![bujots-demo](https://github.com/hylu-dev/bujots/blob/main/demo.png)

[Video Demo](https://www.hylu.dev/images/bujots.mp4)

The goal of this project is to mimic the joy and satisfaction of writing beautiful journal entry and apply that to jot notes.

Along with the ability to write daily notes, organized with a timeline. Notes can be freely customized through the use of stickers allowing more personality and charm between each note.

Development on this project is currently on hiatus.
The project is currently hosted on https://bujots.netlify.app though the database is currently inactive.
Please reach out if your interested in using the live app.

## Features

- Automatic saving whenever changes are made
- Timeline keeps track of prior and new journal pages
- Images are automatically formatted into bordered stickers
- Notes and stickers are unique per user

## Roadmap

- Multiline jots with full text editor allowing full rich text with multiple fonts
- Sticker manipulation (resize, rotate, etc)
- More paper styles and layouts to choose from
- Keyword searching through jots

---

## Overview

### Involvement

This is a solo project designed and programmed by Roy Lu (me). Notable dependencies include [framer-motion](https://www.npmjs.com/package/framer-motion) for page transitions and a number of animations.

### Code Highlights

Folder structure follows the standard ReactJS/@TypeScript CLI project creation. The code is broken up into two section: **bujots-front/** houses all the frontend code while **server/** holds the backend server code and database manipulation. Below, I've highlighted core sections of the code for each along with some context.

#### Frontend _(bujots-front/)_

- **src/pages/**
  - These are the basis for the main web pages, further made up of components
- **src/components**
  - These components make up independent portions of the web page such as the notebook itself, stickers, timeline, etc. Below are the core components of the journaling function (which are further broken down into more subcomponents)
    - components/journal/JournalPage
    - components/journal/timeline/Timeline
    - components/journal/OptionsPanel
    - components/journal/stickerTray/StickerTray
- **src/slices**
  - Slices were introduced in [Redux Toolkit](https://redux-toolkit.js.org/) and are used here for global state management. Each containing reducer file manages state for independent portions of the app (e.g. sticker uploading/placement, journal pages, user info, etc.)
- **Styling**
  - [Tailwind CSS](https://www.npmjs.com/package/tailwindcss) framework is employed throughout the project. Therefore, the majority of styling is done inline for all HTML elements. Some customizations were made to the base framework in bujots-front/tailwind.config.js

#### Backend _(server/)_

- **models/**
  - Then database schema's for each type document type is stored here. Namely we store 3 types of documents.
    - **user.model.ts** holds user information including username and password
    - **page.model.ts** holds content for each journal page
    - **image.model.ts** holds all images connecting data to the user
- **routes/**
    - Makes up the server REST API to which the frontend communicates with to send/update/retrieve/delete information from the database.
