import { Request } from 'express';

// Extend the existing Request interface in the express module
// You can replace 'any' with a more specific type if you know what user should contain

declare module 'express-serve-static-core' {
  interface Request {
      user?: any;
  }
}