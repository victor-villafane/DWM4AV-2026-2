import { useEffect, useState } from 'react'
import ItemLoading from '../../components/ItemLoading'
import ItemError from '../../components/ItemError'
import ItemPelicula from '../../components/ItemPelicula'
import { Link } from 'react-router'
import { useApiPeliculas } from '../../services/peliculas.service'

export default function Peliculas() {
  const [peliculas, setPeliculas] = useState([])
  const [estado, setEstado] = useState("LOADING")

  const { getPeliculas } = useApiPeliculas()

  const fetchApi = async () => {
    setEstado("LOADING")
    try {
      const data = await getPeliculas()
      setPeliculas(data);
      setEstado("READY")
    } catch (error) {
      console.error(error);
      setEstado("ERROR")
    }
    // finally {
    //   setLoading(false)
    // }
  }

  useEffect(() => {
    fetchApi()
  }, [])
  let contenido = ""
  switch (estado) {
    case "LOADING":
      contenido = <ItemLoading />
      break;
    case "READY":
      contenido = peliculas.map((pelicula) => <ItemPelicula key={pelicula._id} pelicula={pelicula} />)
      break;
    case "ERROR":
      contenido = <ItemError />
      break;
    default:
      contenido = <ItemError />
      break;
  }

  return (
    <div className='' >
      <h1>Listado de peliculas</h1>
      <Link to="/nueva-pelicula" className='btn btn-outline-primary mt-3 ' >Nueva Pelicula</Link>
      <table className='table striped mt-3' >
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Genero</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contenido}
        </tbody>
      </table>
    </div>
  )
}
