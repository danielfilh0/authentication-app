<h1 align="center">Authentication App</h1>

### Description
Solution for a challenge from <a href="https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw">Devchallenges.io</a>.

Deployment: <a href="https://authentication-app-three.vercel.app">Authentication App</a>.

### Features
- You can register a new account
- You can log in
- You can log in or register with at least one of the following services: Google, Facebook, Twitter or Github
- You can sign out
- You can see your profile details
- You can edit your details including: photo, name, bio, phone, email and password
- You can upload a new photo or provide an image URL

### How to run

You must have Git and Node js installed

Also, it will necessary create an web project on Firebase according to the <a href="https://firebase.google.com/docs/web/setup?authuser=0&%3Bhl=pt">docs</a>

In your terminal, run the following commands:

```bash
$ git clone https://github.com/danielfilh0/authentication-app.git

$ cd authentication-app

$ touch .env

```

In the file .env, add the following code and replace "{{ ... }}" for your firebase project infos

```javascript

NUXT_ENV_VERCEL_FIREBASE_API_KEY="{{ YOUR_FIREBASE_API_KEY }}"
NUXT_ENV_VERCEL_FIREBASE_AUTH_DOMAIN="{{ YOUR_FIREBASE_AUTH_DOMAIN }}"
NUXT_ENV_VERCEL_FIREBASE_PROJECT_ID="{{ YOUR_FIREBASE_PROJECT_ID }}"
NUXT_ENV_VERCEL_FIREBASE_STORAGE_BUCKET="{{ YOUR_FIREBASE_STORAGE_BUCKET }}"
NUXT_ENV_VERCEL_FIREBASE_MESSAGING_SENDER_ID="{{ YOUR_FIREBASE_MESSAGING_SENDER_ID }}"
NUXT_ENV_VERCEL_FIREBASE_APP_ID="{{ YOUR_FIREBASE_APP_ID }}"

```

After that, run:

```bash

$ yarn

$ yarn dev

```

Be happy.

### Stacks
- Vue js
- Nuxt js
- Vuetify
- Firebase
