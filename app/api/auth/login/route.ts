import { serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';  // You need bcrypt to compare the password
import { getUser } from '@/app/lib/data';

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body for login data (username and password)
    const { username, password, usertype } = await req.json();

    // Fetch the user from the database based on the usertype and username
    const user = await getUser(username, usertype);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Compare the provided password with the stored password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // If the credentials are correct, create session data
    const sessionData = {
      username: username,
      password: password,
      usertype: usertype,
      // Include any other session-related data, like userId, roles, etc.
    };

    // Encrypt (or serialize) the session data
    const encryptedSessionData = JSON.stringify(sessionData);

    // Set the session cookie
    const cookie = serialize('session', encryptedSessionData, {
      httpOnly: true,  // Prevent JavaScript access
      secure: process.env.NODE_ENV === 'production',  // Ensure it is only sent over HTTPS in production
      maxAge: 60 * 60 * 24 * 1,  // Set cookie expiration to 1 day
      path: '/',  // Available on all routes
    });

    // Create response and set the cookie in the header
    const response = NextResponse.json({ message: 'Successfully logged in!' });
    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
