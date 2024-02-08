import type { NextRequest } from 'next/server';
import type { UserEntry } from '@/lib/types';
import sql from 'better-sqlite3';

const db = sql('./userdata.db');

function getToken(req: NextRequest): string | null {
  return req.cookies.get('token')?.value || null;
}

function getUserFromToken(token: string): UserEntry | undefined {
  return db.prepare('SELECT id FROM logins WHERE token = ?').get(token) as
    | UserEntry
    | undefined;
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

  const user = getUserFromToken(token);
  if (!user) return jsonResponse(404, { error: 'User not found' });

  const todos = db
    .prepare('SELECT id, text, deadline FROM todos WHERE userId = ?')
    .all(user.id);
  return jsonResponse(200, { todos });
}

export async function POST(req: NextRequest) {
  const token = getToken(req);
  if (!token) return jsonResponse(400, { error: 'Token is required' });

  const user = getUserFromToken(token);
  if (!user) return jsonResponse(404, { error: 'User not found' });

  const { text, deadline } = await req.json();
  if (!text || !deadline)
    return jsonResponse(400, { error: 'Missing todo text or deadline' });

  db.prepare('INSERT INTO todos (userId, text, deadline) VALUES (?, ?, ?)').run(
    user.id,
    text,
    deadline
  );
  return jsonResponse(201, { success: true, message: 'Todo added' });
}

export async function PUT(req: NextRequest) {
  const token = getToken(req);
  if (!token) return jsonResponse(400, { error: 'Token is required' });

  const user = getUserFromToken(token);
  if (!user) return jsonResponse(404, { error: 'User not found' });

  const { id, text, deadline } = await req.json();
  if (!id || !text || !deadline)
    return jsonResponse(400, { error: 'Missing todo id, text, or deadline' });

  const result = db
    .prepare(
      'UPDATE todos SET text = ?, deadline = ? WHERE id = ? AND userId = ?'
    )
    .run(text, deadline, id, user.id);
  if (result.changes === 0)
    return jsonResponse(404, { error: 'Todo not found or no change made' });

  return jsonResponse(200, { success: true, message: 'Todo updated' });
}

export async function DELETE(req: NextRequest) {
  const token = getToken(req);
  if (!token) return jsonResponse(400, { error: 'Token is required' });

  const user = getUserFromToken(token);
  if (!user) return jsonResponse(404, { error: 'User not found' });

  const { id } = await req.json();
  if (!id) return jsonResponse(400, { error: 'Missing todo id' });

  const result = db
    .prepare('DELETE FROM todos WHERE id = ? AND userId = ?')
    .run(id, user.id);
  if (result.changes === 0)
    return jsonResponse(404, { error: 'Todo not found' });

  return jsonResponse(200, { success: true, message: 'Todo deleted' });
}
