import { admin } from "../../config/firebaseAdmin";

export default async function extractUidFromToken(idToken:string) :Promise<string> {
  try {
    console.log("Id Token: " + idToken);
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    console.log("uid: " + uid);
    return uid;
  } catch (error) {
    console.error('Error verifying ID token:', error);
    console.log(error);
    throw error;
  }
}