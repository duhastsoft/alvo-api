import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../entity/User';

function authorize(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.userData.role as keyof UserRole;

    if (!roles.includes(UserRole[role])) {
      res.status(401).json({ message: 'Not allowed' });
      return;
    }
    next();
  };
}

export { authorize };
