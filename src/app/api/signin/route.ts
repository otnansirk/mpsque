import ClientAPI from '@/libs/api';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

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
    await api.auth.setSession({access_token, refresh_token})
    ;(await cookies()).set('_Access_Token', access_token, {
      maxAge: 30// 7 days left
    })
    
    return NextResponse.json({ access_token }, { status:200 });

  } catch {
    return NextResponse.json({message: "Internal server error"}, { status: 500 });
  }
}
