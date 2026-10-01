import { useState, useEffect } from 'react'
export default function Fetch() {

    const [personajes, setPersonajes] = useState([])
    const [page, setPage] = useState({})
    const [currectPage, setPageCurrectPage] = useState(1)

    const fetchApi = (uri = `https://api.disneyapi.dev/character?page=${currectPage}&pageSize=50`) => {
        fetch(uri)
            .then((res) => res.json())
            .then((data) => {
                setPersonajes(data.data)
                setPage(data.info)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        //componentDidMount() -> Cuando el component se monta
        console.log("componentDidMount()")
        fetchApi()
    }, [])

    useEffect(() => {
        //componentDidUpdate() -> Solo se llama cuando el componente se actualiza
        console.log("componentDidUpdate()")
        fetchApi()
    }, [currectPage])

    return (
        <div className='container-fluid' >
            <h1>Personajes</h1>
            <table className='table table-striped' >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Peliculas</th>
                        <th>Juegos</th>
                    </tr>
                </thead>
                <tbody>
                    {personajes.map(personaje => (
                        <tr key={personaje._id} >
                            <td>
                                <img width="100px" src={personaje.imageUrl} alt="" />
                            </td>
                            <td>{personaje.name}</td>
                            <td>{personaje?.films?.join(",")}</td>
                            <td>{personaje?.videoGames?.join(",")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        {currectPage > 1 &&
                            <button onClick={() => setPageCurrectPage(currectPage - 1)} className="page-link">Previous</button>}
                    </li>
                    <li className="page-item">
                        <button onClick={() => setPageCurrectPage(currectPage)} className="page-link" >{currectPage}</button>
                    </li>
                    <li className="page-item">
                        <button onClick={() => setPageCurrectPage(currectPage + 1)} className="page-link" >{currectPage + 1}</button>
                    </li>
                    <li className="page-item">
                        <button onClick={() => setPageCurrectPage(currectPage + 2)} className="page-link" >{currectPage + 2}</button>
                    </li>
                    <li className="page-item">
                        {currectPage < page.totalPages &&
                            <button onClick={() => setPageCurrectPage(currectPage + 1)} className="page-link">Next</button>}
                    </li>
                </ul>
            </nav>
        </div>
    )
}
