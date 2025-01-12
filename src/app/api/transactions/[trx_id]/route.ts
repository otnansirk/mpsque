// import ClientAPI from "@/libs/api";
import ClientAPI from 'libs/api';

import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';


export async function DELETE(req: NextRequest, { params } : { params: Promise<{trx_id: string}> }) {
    const transaction_id = (await params).trx_id;

    try {
        const api = ClientAPI()
        if (!api) {
            return NextResponse.json('Not Connected', { status: 401 });
        }

        const { error } = await api.from("transactions").delete().eq('id', transaction_id)

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "Successfully" }, { status: 200 });

    } catch {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
