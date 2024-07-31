import admin from 'firebase-admin';

import type { FirebaseAuthError } from 'firebase-admin/lib/utils/error';

interface FirebaseError {
  code: string;
  message: string;
}

const auth = admin.auth();

function isFirebaseAuthError(error: FirebaseError): error is FirebaseAuthError {
  return error.code.startsWith('auth/');
}

export default async function checkUserExists(email: any) {
  try {
    await auth.getUserByEmail(email);
    return true; // User exists
  } catch (error: any) {
    if (isFirebaseAuthError(error)) {
      if (error.code === 'auth/user-not-found') {
        return false; // User does not exist
      } else {
        console.error('FirebaseAuthError:', error);
        throw error;
      }
    } else {
      console.error('Non-FirebaseAuthError:', error);
      throw error;
    }
  }
}