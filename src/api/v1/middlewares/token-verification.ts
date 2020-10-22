import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import env from '../utils/envoriment';

const tokenVerify = (req: Request, res: Response, next: NextFunction): void => {
  try {
    let token = {};
    //Splits token from the Bearer
    if (req.headers.authorization) {
      token = req.headers.authorization.split('Bearer ')[1];
    } else if (req.query.token) {
      token = req.query.token;
    }
    //Attempts to decode the token
    const decoded = jwt.verify(token, env.encryption.jwt, null);
    //The resulting data from the decoding is set in req

    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not verified user, please login and add the token' });
  }
};

export default tokenVerify;
