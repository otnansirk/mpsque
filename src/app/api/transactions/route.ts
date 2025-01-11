import ClientAPI from '@/libs/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { amount, description, type } = await req.json();
    try {
        const api = ClientAPI()
        if (!api) {
            return NextResponse.json('Not Connected', { status: 401 });
        }
            
        const { error } = await api.from("transactions").insert({
            amount, description, type
        })

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "Successfully" }, { status: 200 });

    } catch {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const start_date = searchParams.get('start_date')
    const end_date = searchParams.get('end_date')
    
    
    try {
        const api = ClientAPI()
        if (!api) {
            return NextResponse.json('Not Connected', { status: 401 });
        }

        const { data, error } = await api.from("transactions")
                                        .select('*')
                                        .gte('created_at', start_date)
                                        .lte('created_at', end_date)
                                        .order('created_at', {
                                            ascending: false
                                        })

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json({ data }, { status: 200 });

    } catch {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
