//Firebase-admin sdk handles token verification. It internally already uses JWT.

import { Response, NextFunction } from 'express';
import { Request } from "express-serve-static-core";
import { admin } from '../config/firebaseAdmin';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log("User verified successfully.");
    
    //Using custom type from src/types/custom.d.ts for req.user type
    next();
  } catch (error) {
    console.log(error);
    
    return res.status(401).send('Unauthorized');
  }
};

export default verifyToken;
