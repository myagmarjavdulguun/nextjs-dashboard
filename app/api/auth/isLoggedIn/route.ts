import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const sessionCookie = (await cookies()).get('session')?.value;

    let sessionData = null;
    if (sessionCookie) {
      try {
        // Decrypt and parse the cookie
        const decryptedData = sessionCookie; // Simulating decrypt here
        sessionData = JSON.parse(decryptedData);
      } catch (error) {
        console.error("Failed to decrypt or parse session data", error);
        sessionData = null;
      }
    }

    if (sessionData) {
      // If session data is found, return it with a 200 status
      return NextResponse.json({ sessionData });
    } else {
      // If session data is not found, return 401 Unauthorized
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error fetching session data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
