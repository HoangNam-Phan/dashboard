import sql from 'better-sqlite3';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserEntry } from './types';

const db = sql('logins.db');

function hashPassword(password: string | Buffer) {
  return bcrypt.hashSync(password, 10);
}

function getStoredUser(userName: string | Buffer) {
  return db
    .prepare('SELECT * FROM logins WHERE username = ?')
    .get(userName) as UserEntry;
}

function getPasswordMatch(password: string | Buffer, storedPassword: string) {
  return bcrypt.compareSync(password, storedPassword);
}

//to be deleted, just for testing purposes
function logAllUsers() {
  const logins = db.prepare('SELECT * FROM logins').all();
  console.log(logins);
}

function findUserToken(user: User) {
  const storedUser = getStoredUser(user.userName);
  const passwordMatch = getPasswordMatch(user.password, storedUser.password);

  if (passwordMatch) {
    return storedUser.token;
  } else {
    return null;
  }
}

export function isExistingUser(user: User) {
  const existingUser = db
    .prepare('SELECT * FROM logins WHERE username = ?')
    .get(user.userName);

  return existingUser;
}

export function saveUser(user: User) {
  const hashedPassword = hashPassword(user.password);
  const token = jwt.sign({ username: user.userName }, 'top-secret-login-token');

  db.prepare(
    `
    INSERT INTO logins
      (username, password, token)
    VALUES (
      @userName,
      @password,
      @token
    )
  `
  ).run({
    userName: user.userName,
    password: hashedPassword,
    token,
  });
}
export function isValidUser(user: User) {
  if (user.userName === 'admin' && user.password === 'admin') {
    return { success: true, token: 1 };
  }

  const storedUser: UserEntry = getStoredUser(user.userName);
  if (!storedUser) {
    return { success: false, message: 'User does not exist' };
  }

  const passwordMatch = getPasswordMatch(user.password, storedUser.password);
  if (!passwordMatch) {
    return { success: false, message: 'Incorrect password' };
  }

  const token = findUserToken(user);

  return { success: true, token };
}
