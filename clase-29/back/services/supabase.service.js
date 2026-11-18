import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
    "https://dnqgioqkolurocndhvsh.supabase.co",
    "sb_secret_XXXXXXXX"
)