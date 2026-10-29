import { call } from "./api.service"

export function useApiPeliculas(){
    const getPeliculas = () => call("/peliculas")
    const getPeliculasById = (id) => call("/peliculas/" + id)
    const createPeliculas = (pelicula) => call("/peliculas", "POST", pelicula)
    const updatePeliculas = (id, pelicula) => call("/peliculas/" + id, "PUT", pelicula)
    const deletePeliculas = (id) => call("/peliculas/" + id, "DELETE")

    return {
        getPeliculas,
        getPeliculasById,
        createPeliculas,
        updatePeliculas,
        deletePeliculas
    }
}