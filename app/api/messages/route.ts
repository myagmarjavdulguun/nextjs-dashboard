import { getMessages } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const graduate_id = searchParams.get('graduate_id');
    const instructor_id = searchParams.get('instructor_id');

    if (!graduate_id || !instructor_id) {
      return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 });
    }

    const messages = await getMessages(graduate_id, instructor_id);

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages.' }, { status: 500 });
  }
}
