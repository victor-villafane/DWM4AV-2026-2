import React, { useEffect } from 'react'
import { supabase } from '../../services/supabase.service'

export default function CallbackAuth() {

    useEffect( () => {
        supabase.auth.getSession()
            .then( async (datos) => {
                console.log(datos.data.session.access_token)
                const url = import.meta.env.VITE_API_URL
                const res = await fetch(url + "/usuarios/social-login", {
                    headers: {
                        "authorization": "Bearer " + datos.data.session.access_token
                    },
                    method: "POST"
                })
                if( !res.ok ) throw new Error("")
                const usuario = await res.json()
            } )
            .catch( err => console.log(err) )
    }, [] )

    return (
        <div>CallbackAuth</div>
    )
}
