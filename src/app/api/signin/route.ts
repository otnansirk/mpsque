// import ClientAPI from '@/libs/api';
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

    return NextResponse.json({access_token: data.session.access_token}, { status:200 });

  } catch (_) {
    return NextResponse.json({message: "Internal server error"}, { status: 500 });
  }
}
