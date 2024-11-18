import { serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; 
import { getUser } from '@/app/lib/data';

export async function POST(req: NextRequest) {
  try {
    const { username, password, usertype } = await req.json();

    const user = await getUser(username, usertype);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const sessionData = {
      username: username,
      password: password,
      usertype: usertype,
    };

    const encryptedSessionData = JSON.stringify(sessionData);

    const cookie = serialize('session', encryptedSessionData, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      maxAge: 60 * 60 * 24 * 1, 
      path: '/', 
    });

    const response = NextResponse.json({ message: 'Successfully logged in!' });
    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
