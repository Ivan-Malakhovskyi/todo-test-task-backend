import 'dotenv/config';

const { AUTH_SECRET } = process.env;

export const authConstants = {
  secret: AUTH_SECRET!,
};
