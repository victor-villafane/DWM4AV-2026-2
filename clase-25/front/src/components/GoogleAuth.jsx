import React from 'react'
import { supabase } from '../services/supabase.service'

export default function GoogleAuth() {

    const loginGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/callback`
            }
        })
        console.log(error)
    }

    return (
        <div onClick={loginGoogle} >GoogleAuth</div>
    )
}
