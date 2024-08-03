#Node.js Backend
This project is built using Node.js with [Express](https://www.npmjs.com/package/express). Firebase for Auth and Database.

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm run build
npm start
```
  Navigate to `http://localhost:3000`

##Run in Development Environment
Run `npm run dev` which runs the script: `ts-node src/index.ts`

#Important notes
- ts-node may have issue with custom type in this typescript project.
- firebaseServiceAccount.json has not been pushed due to security reasons.