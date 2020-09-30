import { Request, Response } from 'express';

async function test(req: Request, res: Response) {
    res.status(200).send('User done');
  }

export {test};