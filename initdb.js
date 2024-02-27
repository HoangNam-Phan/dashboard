const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function initData() {
  try {
    await client.connect();
    const database = client.db('dashboard');
    const logins = database.collection('logins');
    const todos = database.collection('todos');

    const testLogin = {
      userName: 'admin',
      password: 'admin',
      token: '1',
    };

    let adminLogin = await logins.findOne({ userName: 'admin' });

    if (!adminLogin) {
      await logins.insertOne(testLogin);
      adminLogin = await logins.findOne({ userName: 'admin' });
    }

    if (adminLogin) {
      const testTodos = [
        { text: 'Finish TypeScript assignment', deadline: '2024-02-10' },
        { text: 'Grocery shopping for the week', deadline: '2024-02-08' },
        { text: 'Schedule dentist appointment', deadline: '2024-02-15' },
        { text: 'Book flight tickets', deadline: '2024-03-01' },
      ];

      await Promise.all(
        testTodos.map((todo) => {
          return todos.updateOne(
            { text: todo.text, userId: adminLogin._id },
            { $set: { ...todo, userId: adminLogin._id } },
            { upsert: true }
          );
        })
      );
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  } finally {
    await client.close();
  }
}

initData();
