import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loading from '../components/Loading'
import Error from '../components/Error'
import DetalleProducto from '../components/DetalleProducto'

export default function Detalle() {
    const { id } = useParams()
    const [estado, setEstado] = useState("LOADING")
    const [producto, setProducto] = useState(null)

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/" + id)
            .then(res => res.json())
            .then(data => {
                setProducto(data)
                setEstado("READY")
            })
            .catch(err => setEstado("ERROR"))
    }, [])
    if( estado == "ERROR" ) return <Error mensaje="Producto no encontrado" />
    if( estado == "LOADING" ) return <Loading />

    return <DetalleProducto producto={producto} />
}
