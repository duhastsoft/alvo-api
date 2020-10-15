import { Request, Response } from 'express';
import { Result, ValidationError } from 'express-validator';

export function validationErrors(errors: Result<ValidationError>, req: Request, res: Response) {
  res.status(400).json({
    message: 'There was a problem with the request',
    errors: errors.array(),
  });
}