import { useEffect, useState } from 'react'
import ItemLoading from '../components/ItemLoading'
import ItemError from '../components/ItemError'
import Item from '../components/Item'

export default function App() {
  const [monedas, setMonedas] = useState([])
  const [estado, setEstado] = useState("LOADING")

  const fetchApi = async () => {
    setEstado("LOADING")
    const url = 'https://api.coinlayer.com/list?access_key=2420f6e00f425a657d396bc3e96afc3a';
    const options = {
      method: 'GET',
      headers: { Accept: 'application/json, application/json; Charset=UTF-8' }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMonedas(Object.values(data.crypto));
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
    // fetchApi()
  }, [])
  let contenido = ""
  switch (estado) {
    case "LOADING":
      contenido = <ItemLoading />
      break;
    case "READY":
      contenido = monedas.map((moneda) => <Item key={moneda.symbol} moneda={moneda} />)
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
      <h1>Listado de monedas</h1>
      <table className='table striped mt-3' >
        <thead>
          <tr>
            <th>#</th>
            <th>Simbolo</th>
            <th>Nombre</th>
            <th>Nombre completo</th>
            <th>Max Supply</th>
          </tr>
        </thead>
        <tbody>
          {contenido}
        </tbody>
      </table>
    </div>
  )
}
