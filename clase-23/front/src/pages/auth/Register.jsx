import React from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { usersRegisterSchema } from '../../schemas/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { useApiAuth } from '../../services/auth.service'
import { useState } from 'react'
import Alert from '../../components/Alert'

export default function Register() {

    const navigate = useNavigate()
    const [alert, setAlert] = useState({ message: "", type: "" })
    const { register: registerApi } = useApiAuth()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(usersRegisterSchema), criteriaMode: "all" })

    const onSubmit = async (usuario) => {
        try {
            await registerApi(usuario)
            navigate("/login")
            setAlert({ message: "Registro exitoso", type: "success" })
        } catch (error) {
            console.log(error)
            setAlert({ message: "No se pudo registar el usuario", type: "error" })
        }
    }
    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center' >
            {alert.message && <Alert message={alert.message} type={alert.type} />}
            <div className='card shadow p-4' style={{ width: "500px" }}>
                <h2 className='text-center mb-4' >Registrar usuario</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" {...register("email")} aria-describedby="emailHelp" />
                        {errors.email && <div className='text-danger' >{errors.email?.message}</div>}
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="name" {...register("name")} aria-describedby="emailHelp" />
                        {errors.name && <div className='text-danger' >{errors.name?.message}</div>}
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Nombre de usuario:</label>
                        <input type="username" class="form-control" id="username" {...register("username")} aria-describedby="emailHelp" />
                        {errors.username && <div className='text-danger' >{errors.username?.message}</div>}
                    </div>
                    <div class="mb-3">
                        <label for="pass" class="form-label">Password</label>
                        <input type="text" class="form-control" id="pass" {...register("password")} />
                        {errors.password && <div className='text-danger' >
                            {
                                typeof errors.password?.types.invalid_format == "object"
                                    ? errors.password?.types?.invalid_format.map(error => <p>{error}</p>)
                                    : errors.password?.message
                            }
                        </div>}
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">passwordConfirm:</label>
                        <input type="text" class="form-control" id="passwordConfirm" {...register("passwordConfirm")} aria-describedby="emailHelp" />
                        {errors.passwordConfirm && <div className='text-danger' >{errors.passwordConfirm?.message}</div>}
                    </div>
                    <button disabled={isSubmitting} type="submit" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    )
}
