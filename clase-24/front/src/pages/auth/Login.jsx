import { useNavigate } from 'react-router'
import { useApiAuth } from '../../services/auth.service'
import Alert from '../../components/Alert'
import { useLogin } from '../../context/session.context'
import { useState } from 'react'

export default function Login() {

    const navigate = useNavigate()
    const [alert, setAlert] = useState({ message: "", type: "" })
    const { login } = useApiAuth()
    const authLogin = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.pass.value

        try {
            const usuario = await login({ email: email, password: pass })
            authLogin(usuario)
            navigate("/productos")
            setAlert({ message: "Bienvenido", "type": "success" })
        } catch (error) {
            console.log("Error")
            setAlert({ message: "Usuario/contraseña incorrectos", "type": "error" })
        }
    }

    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center' >
            { alert.message && <Alert message={alert.message} type={alert.type} /> }
            <div className='card shadow p-4' style={{ width: "500px" }}>
                <h2 className='text-center mb-4' >Iniciar sesion</h2>
                <form onSubmit={handleSubmit} action="">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input type="password" className="form-control" id="pass" name='pass' />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
