import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import env from '../utils/environment';

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    let token = '';
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    //Attempts to decode the token
    const decoded = jwt.verify(token, env.encryption.jwt);
    //The resulting data from the decoding is set in req

    req.userData = decoded as { id: string; role: string };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not verified user, please login and add the token' });
  }
};

export default authenticate;
