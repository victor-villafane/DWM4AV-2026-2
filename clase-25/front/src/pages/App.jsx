import { useEffect, useState } from 'react'
import ItemLoading from '../components/ItemLoading'
import ItemError from '../components/ItemError'
import Item from '../components/Item'

export default function App() {
  const [productos, setProductos] = useState([])
  const [estado, setEstado] = useState("LOADING")

  const fetchApi = async () => {
    setEstado("LOADING")
    const url = 'https://fakestoreapi.com/products';
    const options = {
      method: 'GET',
      headers: { Accept: 'application/json, application/json; Charset=UTF-8' }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setProductos(data);
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
      contenido = productos.map((producto) => <Item key={producto.id} producto={producto} />)
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
      <h1>Listado de productos</h1>
      <table className='table striped mt-3' >
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Precio</th>
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
