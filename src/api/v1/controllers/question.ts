import { Request, Response } from 'express';

async function obtainAll(req: Request, res: Response) {
    res.status(200).send('Question done');
  }

async function remove(req: Request, res: Response) {
    res.status(200).send('Question record deleted');
}

async function update(req: Request, res: Response) {
    res.status(200).send('Question record updated');
}

export {obtainAll, remove, update};