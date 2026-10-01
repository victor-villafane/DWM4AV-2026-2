import { useState } from "react"
import { useEffect } from "react"

export default function FetchRealTime() {

    const [dolares, setDolares] = useState([])

    useEffect(() => {
        const fetchApi = () => {
            fetch('https://dolarapi.com/v1/dolares')
                .then((res) => res.json())
                .then(data => setDolares(data))
                .catch((err) => console.log(err))
        }
        //Primera llamada
        fetchApi()

        //Agregar un intervalo de 5s
        const interval = setInterval(fetchApi, 5000)
        //
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="container-fluid" >
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Compra</th>
                        <th>Venta</th>
                        <th>Actualizacion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dolares.map((dolar) => (
                            <tr key={dolar.nombre} >
                                <td>{dolar.nombre}</td>
                                <td>{dolar.compra}</td>
                                <td>{dolar.venta}</td>
                                <td>{dolar.fechaActualizacion}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
