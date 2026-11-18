import React from 'react'
import { supabase } from '../../services/supabase.service'
import { FcGoogle } from "react-icons/fc"

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
        <button
            onClick={loginGoogle}
            className='btn d-flex align-item-center justify-content-center gap-2 w-full p-2 border-0 rounded-3 shadow-sm'
        >
            <FcGoogle size={30} />
            <span className='fw-medium' >Continuar con Google</span>
        </button>)
}
