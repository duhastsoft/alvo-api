import bcrypt from 'bcrypt';
import env from '../utils/envoriment'

const gbsalt = env.encryption.salt;

function generatePassword(password: string): string {
  const salt = bcrypt.genSaltSync(gbsalt);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export default generatePassword;