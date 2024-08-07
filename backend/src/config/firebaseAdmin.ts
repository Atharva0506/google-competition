//Firebase admin is for handling backend authorization requests
//Firebase uses jwt.
//We can verify jwt using token returned by firebase.
//For all this we need to use service Account configuration

import admin from 'firebase-admin';
import serviceAccountCredentials from './firebaseServiceAccount.json';
//firebaseServiceAccount.json is not commited and pushed due to security reasons.

import dotenv from "dotenv";
dotenv.config();

const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL!,
});

const db = admin.database();

export {admin, db};