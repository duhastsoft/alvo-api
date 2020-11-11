import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../entity/User';
import environment from '../utils/environment';

export class Token {
  message: string;
  status: number;
  token: string;
}

async function createToken(password: string, doc: User): Promise<Token> {
  return bcrypt
    .compare(password, doc.password)
    .then((result) => {
      const tokenRes = new Token();
      if (result) {
        const token = jwt.sign(
          {
            idUser: doc.id,
            account: doc.account,
            email: doc.email,
            role: doc.role,
            status: doc.status,
          },
          environment.encryption.jwt,
          {
            expiresIn: '7d',
          }
        );
        tokenRes.message = 'Here is your token';
        tokenRes.status = 200;
        tokenRes.token = token;
        return tokenRes;
      }
      tokenRes.message = 'Authentication failed, try agian later';
      tokenRes.status = 500;
      return tokenRes;
    })
    .catch((err) => {
      const errorRes = new Token();
      errorRes.message = err.message;
      errorRes.status = 500;
      return errorRes;
    });
}

export default createToken;
