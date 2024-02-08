const sql = require('better-sqlite3');
const db = sql('userdata.db');

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS logins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE
  )
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    text TEXT NOT NULL,
    deadline TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES logins(id)
  )
`
).run();

const testLogins = [
  {
    userName: 'admin',
    password: 'admin',
    token: '1',
  },
];

const testTodos = [
  {
    userName: 'admin',
    todos: [
      { text: 'Finish TypeScript assignment', deadline: '2024-02-10' },
      { text: 'Grocery shopping for the week', deadline: '2024-02-08' },
      { text: 'Schedule dentist appointment', deadline: '2024-02-15' },
      { text: 'Book flight tickets', deadline: '2024-03-01' },
    ],
  },
];

async function initData() {
  const addTestLogins = db.prepare(`
    INSERT INTO logins (userName, password, token) VALUES (@userName, @password, @token)
  `);

  for (const login of testLogins) {
    addTestLogins.run(login);
  }

  const addTestTodos = db.prepare(`
    INSERT INTO todos (userId, text, deadline) VALUES (
      (SELECT id FROM logins WHERE userName = @userName),
      @text,
      @deadline
    )
  `);

  for (const { userName, todos } of testTodos) {
    todos.forEach((todo) => {
      addTestTodos.run({ userName, ...todo });
    });
  }
}

initData();
