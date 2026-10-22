import { useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { peliculasSchema } from "../../schemas/peliculas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

export default function EditarPelicula() {

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        fetch("http://localhost:2026/api/peliculas/" + id)
            .then(res => res.json())
            .then(data => reset(data))
            .catch(err => console.log(err))
    }, [])

    // 1. Conectar el useForm con el schema
    const {
        register,            // Conecta cada input con el formulario
        handleSubmit,        // Valida ( usando zod ) y luego llama a onSubmit
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: zodResolver(peliculasSchema)
    })
    const onSubmit = (datos) => {
        console.log(datos)
        fetch("http://localhost:2026/api/peliculas/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        })
            .then((res) => res.json())
            .then(data => navigate("/productos/" + data._id))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Editar pelicula</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3" >
                    <label className="form-label" htmlFor="">Titulo</label>
                    <input className="form-control" type="text" {...register("title")} id="title" />
                    {errors.title && <div className="text-danger" >{errors.title.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="">Pais</label>
                    <input className="form-control" type="text" {...register("country")} id="country" />
                    {errors.country && <div className="text-danger" >{errors.country.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="">Idioma</label>
                    <input className="form-control" type="text" {...register("language")} id="language" />
                    {errors.language && <div className="text-danger" >{errors.language.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="">Genero</label>
                    <input className="form-control" type="text" {...register("primary_genre")} id="primary_genre" />
                    {errors.primary_genre && <div className="text-danger" >{errors.primary_genre.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="">Produccion</label>
                    <select className="form-control" {...register("production_scale")} id="production_scale">
                        <option defaultChecked disabled></option>
                        <option value="Commercial">Comercial</option>
                        <option value="Independent">Independiente</option>
                    </select>
                    {errors.production_scale && <div className="text-danger" >{errors.production_scale.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="">Año</label>
                    <input className="form-control" type="number" {...register("year", { valueAsNumber: true })} id="year" min={1900} />
                    {errors.year && <div className="text-danger" >{errors.year.message}</div>}
                </div>
                <button type='submit' disabled={isSubmitting} className="btn btn-outline-secondary" >Guardar</button>
            </form>
        </div>
    )
}
