import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserEntry } from './types';

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@dashboard.mvhe8u3.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function hashPassword(password: string | Buffer) {
  return bcrypt.hash(password, 10);
}

async function getStoredUser(userName: string | Buffer) {
  await client.connect();
  const database = client.db('dashboard');
  const logins = database.collection('logins');
  return await logins.findOne({ userName });
}

function getPasswordMatch(password: string | Buffer, storedPassword: string) {
  return bcrypt.compare(password, storedPassword);
}

async function findUserToken(user: UserEntry) {
  const storedUser = await getStoredUser(user.userName);
  if (storedUser) {
    const passwordMatch = await getPasswordMatch(
      user.password,
      storedUser.password
    );
    if (passwordMatch) {
      return storedUser.token;
    }
  }
  return null;
}

export async function isExistingUser(user: User) {
  const existingUser = await getStoredUser(user.userName);
  return existingUser != null;
}

export async function saveUser(user: User) {
  await client.connect();
  const database = client.db('dashboard');
  const logins = database.collection('logins');

  const hashedPassword = await hashPassword(user.password);
  const token = jwt.sign({ username: user.userName }, 'top-secret-login-token');

  const result = await logins.insertOne({
    userName: user.userName,
    password: hashedPassword,
    token,
  });

  return result.insertedId;
}

export async function isValidUser(user: User) {
  const storedUser = await getStoredUser(user.userName);
  if (!storedUser) {
    return { success: false, message: { userName: 'User does not exist!' } };
  }

  const passwordMatch = await getPasswordMatch(
    user.password,
    storedUser.password
  );
  
  if (!passwordMatch) {
    return { success: false, message: { password: 'Incorrect password!' } };
  }

  const token = await findUserToken(user as UserEntry);
  return token ? { success: true, token } : { success: false };
}
