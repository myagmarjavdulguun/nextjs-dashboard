import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    (await cookies()).delete('session');

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error fetching session data:', error);
    return NextResponse.json({ sessionData: null }, { status: 500 });
  }
}
