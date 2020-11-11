import bcrypt from 'bcrypt';
import env from '../utils/environment';

const gbsalt = env.encryption.salt;

function generatePassword(password: string): string {
  const salt = bcrypt.genSaltSync(gbsalt);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export default generatePassword;
