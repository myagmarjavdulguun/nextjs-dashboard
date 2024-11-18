import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const sessionCookie = (await cookies()).get('session')?.value;

    let sessionData = null;
    if (sessionCookie) {
      try {
        const decryptedData = sessionCookie; 
        sessionData = JSON.parse(decryptedData);
      } catch (error) {
        console.error("Failed to decrypt or parse session data", error);
        sessionData = null;
      }
    }

    if (sessionData) {
      return NextResponse.json({ sessionData });
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error fetching session data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
