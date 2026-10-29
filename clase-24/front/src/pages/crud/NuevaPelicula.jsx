import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { peliculasSchema } from "../../schemas/peliculas"
import { zodResolver } from "@hookform/resolvers/zod"
import { call } from "../../services/api.service"
import { useApiPeliculas } from "../../services/peliculas.service"

export default function NuevaPelicula() {

    const navigate = useNavigate()
    // 1. Conectar el useForm con el schema
    const {
        register,            // Conecta cada input con el formulario
        handleSubmit,        // Valida ( usando zod ) y luego llama a onSubmit
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(peliculasSchema)
    })

    const { createPeliculas } = useApiPeliculas()

    const onSubmit = (datos) => {
        createPeliculas(datos)
            .then(data => navigate("/productos/" + data._id))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Nueva pelicula</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3" >
                    <label className="form-label" htmlhtmlFor="">Titulo</label>
                    <input className="form-control" type="text" {...register("title")} id="title" />
                    {errors.title && <div className="text-danger" >{errors.title.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlhtmlFor="">Pais</label>
                    <input className="form-control" type="text" {...register("country")} id="country" />
                    {errors.country && <div className="text-danger" >{errors.country.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlhtmlFor="">Idioma</label>
                    <input className="form-control" type="text" {...register("language")} id="language" />
                    {errors.language && <div className="text-danger" >{errors.language.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlhtmlFor="">Genero</label>
                    <input className="form-control" type="text" {...register("primary_genre")} id="primary_genre" />
                    {errors.primary_genre && <div className="text-danger" >{errors.primary_genre.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlhtmlFor="">Produccion</label>
                    <select className="form-control" {...register("production_scale")} id="production_scale">
                        <option defaultChecked disabled></option>
                        <option value="Commercial">Comercial</option>
                        <option value="Independent">Independiente</option>
                    </select>
                    {errors.production_scale && <div className="text-danger" >{errors.production_scale.message}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlhtmlFor="">Año</label>
                    <input className="form-control" type="number" {...register("year", { valueAsNumber: true })} id="year" min={1900} />
                    {errors.year && <div className="text-danger" >{errors.year.message}</div>}
                </div>
                <button type='submit' disabled={isSubmitting} className="btn btn-outline-secondary" >Guardar</button>
            </form>
        </div>
    )
}
