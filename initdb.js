const sql = require('better-sqlite3');
const db = sql('logins.db');

const testLogins = [
  {
    userName: 'admin',
    password: 'admin',
    token: '1',
  },
];

db.prepare(`
  CREATE TABLE IF NOT EXISTS logins (
    userName TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE
  )
`).run();

async function initData() {
  const addTestLogins = db.prepare(`
    INSERT INTO logins VALUES (
      @userName,
      @password,
      @token
    )
  `);

  for (const login of testLogins) {
    addTestLogins.run(login);
  }
}

initData();
