import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { useApiPeliculas } from '../../services/peliculas.service'

export default function EliminarPelicula() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [estado, setEstado] = useState("LOADING")
    const [pelicula, setPelicula] = useState(null)

    const { deletePeliculas, getPeliculasById } = useApiPeliculas()

    useEffect(() => {
        getPeliculasById(id)
            .then(data => {
                setPelicula(data)
                setEstado("READY")
            })
            .catch(err => setEstado("ERROR"))
    }, [])
    if (estado == "ERROR") return <Error mensaje="Pelicula no encontrada" />
    if (estado == "LOADING") return <Loading />

    const handleBorrar = (e) => {
        e.preventDefault()
        deletePeliculas(id)
            .then(data => navigate("/productos"))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='row' >
                <div className='col-12 col-md-6 col-lg-4' >
                    <img style={{ maxWidth: "250px" }} src={pelicula?.image ? pelicula?.image : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"} alt={pelicula.title} />
                </div>
                <div className='col-12 col-md-6 col-lg-8'>
                    <h2>Desea borrar {pelicula.title} ?</h2>
                    <p>Año: {pelicula.year}</p>
                    <p>Genero: {pelicula.primary_genre}</p>
                    <p>Pais: {pelicula.country}</p>
                    <p>Idioma: {pelicula.language}</p>
                    <p>Escala: {pelicula.production_scale}</p>
                    <form onSubmit={handleBorrar} >
                        <button type='submit' className='btn btn-outline-danger' >Borrar</button>
                    </form>
                </div>
            </div>
            <Link to="/productos" className="btn btn-outline-primary mt-5" >Volver</Link>
        </>
    )
}
