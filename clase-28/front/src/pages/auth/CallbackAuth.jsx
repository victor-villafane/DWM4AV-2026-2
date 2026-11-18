import React, { useEffect } from 'react'
import { supabase } from '../../services/supabase.service'
import { useLogin } from '../../context/session.context'
import { useNavigate } from "react-router"

export default function CallbackAuth() {

    const login = useLogin()
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.getSession()
            .then(async (datos) => {
                console.log(datos.data.session.access_token)
                const url = import.meta.env.VITE_API_URL
                const res = await fetch(url + "/usuarios/social-login", {
                    headers: {
                        "authorization": "Bearer " + datos.data.session.access_token
                    },
                    method: "POST"
                })
                if (!res.ok) throw new Error("")
                const usuario = await res.json()
                login(usuario)
                navigate("/")
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>CallbackAuth</div>
    )
}
