import React from 'react'
import { useNavigate } from 'react-router'

export default function Login() {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.pass.value

        if (email == "admin@admin.com" && pass == "123456") {
            navigate("/productos")
            const usuario = {
                email: "admin@admin.com",
                rol: "admin"
            }
            localStorage.setItem("usuario", JSON.stringify(usuario))
        } else {
            // Podriamos agregar un alert!
        }
    }

    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center' >
            <div className='card shadow p-4' style={{ width: "500px" }}>
                <h2 className='text-center mb-4' >Iniciar sesion</h2>
                <form onSubmit={handleSubmit} action="">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="pass" class="form-label">Password</label>
                        <input type="password" class="form-control" id="pass" name='pass' />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
