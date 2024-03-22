# Setup and configuration file
First clone the repo into an empty directory

## Configuration

### Firbase Configurations
frontend/src/firebase:
  - Firebase.jsx
  - FirebaseConfig.jsx

### Yarn modules
frontend/yarn.lock

### Gitignore
frontend/.gitignore

### Public images
This app uses local images stored in the frontend/public directory.
This is will be implemented with firebase storage emulator.

## Setup

### Firebase Emulators
#### install and setup
npm install -g firebase-tools
firebase login
firebase projects:list
firebase init
-- pick **firebase emulators**
-- choose **default options** for emulators + **storage emulator**
-- choose **default ports**
-- finish
#### install java
sudo apt update
-- type java in terminal to get install options
in our case we installed using the following:
sudo apt install openjdk-11-jre-headless
#### start emulators
firebase emulators:start --only auth,firestore --import database --export-on-exit database

### Start app

#### install yarn
-- type yarn in terminal to get install commands
npm install --global yarn

#### run frontend app
yarn dev