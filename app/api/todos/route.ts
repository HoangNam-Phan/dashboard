import type { NextRequest } from 'next/server';

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@dashboard.mvhe8u3.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

function getToken(req: NextRequest): string | null {
  return req.cookies.get('token')?.value || null;
}

async function getUserFromToken(token: string) {
  await client.connect();
  const database = client.db('dashboard');
  const logins = database.collection('logins');

  return await logins.findOne({ token });
}

function jsonResponse(status: number, body: Record<string, any>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(req: NextRequest) {
  const token = getToken(req);
  if (!token) return jsonResponse(400, { error: 'Token is required' });

  const user = await getUserFromToken(token);
  if (!user) return jsonResponse(404, { error: 'User not found' });

  const database = client.db('dashboard');
  const todos = database.collection('todos');
  const userTodos = await todos.find({ userId: user._id }).toArray();

  return jsonResponse(200, { todos: userTodos });
}

export async function POST(req: NextRequest) {
  const token = getToken(req);
  if (!token) return jsonResponse(400, { error: 'Token is required' });

  const user = await getUserFromToken(token);
  if (!user) return jsonResponse(404, { error: 'User not found' });

  const database = client.db('dashboard');
  const todos = database.collection('todos');

  const { text, deadline } = await req.json();
  if (!text || !deadline)
    return jsonResponse(400, { error: 'Missing todo text or deadline' });

  const result = await todos.insertOne({
    userId: user._id,
    text,
    deadline: deadline,
  });

  return jsonResponse(201, {
    success: true,
    message: 'Todo added',
    todoId: result.insertedId,
  });
}

export async function PUT(req: NextRequest) {
  const token = getToken(req);
  if (!token) return jsonResponse(400, { error: 'Token is required' });

  const user = await getUserFromToken(token);
  if (!user) return jsonResponse(404, { error: 'User not found' });

  const database = client.db('dashboard');
  const todos = database.collection('todos');

  const { _id, text, deadline } = await req.json();
  if (!_id || !text || !deadline)
    return jsonResponse(400, { error: 'Missing todo id, text, or deadline' });

  const objectId = new ObjectId(_id);

  const result = await todos.updateOne(
    { _id: objectId, userId: user._id },
    { $set: { text, deadline: deadline } }
  );

  if (result.modifiedCount === 0)
    return jsonResponse(404, { error: 'Todo not found or no change made' });

  return jsonResponse(200, { success: true, message: 'Todo updated' });
}

export async function DELETE(req: NextRequest) {
  const token = getToken(req);
  if (!token) return jsonResponse(400, { error: 'Token is required' });

  const user = await getUserFromToken(token);
  if (!user) return jsonResponse(404, { error: 'User not found' });

  const database = client.db('dashboard');
  const todos = database.collection('todos');

  const { _id } = await req.json();
  if (!_id) return jsonResponse(400, { error: 'Missing todo id' });

  const objectId = new ObjectId(_id);

  const result = await todos.deleteOne({ _id: objectId, userId: user._id });

  if (result.deletedCount === 0)
    return jsonResponse(404, { error: 'Todo not found' });

  return jsonResponse(200, { success: true, message: 'Todo deleted' });
}
