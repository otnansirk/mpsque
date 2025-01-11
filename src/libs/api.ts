import { createClient, SupabaseClient } from "@supabase/supabase-js";

export default function ClientAPI(): SupabaseClient | null {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_API_KEY) {
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)
        return supabase
    }
    return null
}
