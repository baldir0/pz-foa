import * as crypto from 'crypto';

export const hashPWD = async (
  password: string,
  salt: string
): Promise<string> => {
  const hmac = crypto.createHmac('sha512', salt);
  hmac.update(password);
  return hmac.digest('hex');
};
