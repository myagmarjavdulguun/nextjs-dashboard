import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Simple Base64 decoding function
function simpleDecode(encodedText: string) {
  try {
    return atob(encodedText);  // Base64 decode
  } catch (error) {
    console.error("Failed to decode data", error);
    return null;
  }
}

export async function GET() {
  try {
    const sessionCookie = (await cookies()).get('session')?.value;

    let sessionData = null;
    if (sessionCookie) {
      try {
        // Decode Base64 and then parse the JSON
        const decodedData = simpleDecode(sessionCookie);
        if (decodedData) {
          sessionData = JSON.parse(decodedData);
        }
      } catch (error) {
        console.error("Failed to decode or parse session data", error);
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
