import { admin } from "../../config/firebaseAdmin";

export default async function extractUidFromToken(idToken:string) :Promise<string> {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    return uid;
  } catch (error) {
    console.error('Error verifying ID token:', error);
    console.log(error);
    throw error;
  }
}