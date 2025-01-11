import { createClient, SupabaseClient } from "@supabase/supabase-js";

export default function ClientAPI(): SupabaseClient | null {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_API_KEY) {
        const options = {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
            },
        }

        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY, options)
        return supabase
    }
    return null
}
