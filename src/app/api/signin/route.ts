import ClientAPI from '@/libs/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const api = ClientAPI()
    if (!api) {
      return NextResponse.json('Not Connected', { status: 401 });
    }
    
    const { data, error } = await api.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      return NextResponse.json({message: error.message}, { status: 400 });
    }

    const access_token = data.session.access_token;
    const refresh_token = data.session.refresh_token
    const eee = await api.auth.setSession({access_token, refresh_token})
    console.log("KRIS SIGN", eee);
    console.log("KRIS SIGN 2", data);
    
    return NextResponse.json({ access_token }, { status:200 });

  } catch {
    return NextResponse.json({message: "Internal server error"}, { status: 500 });
  }
}
