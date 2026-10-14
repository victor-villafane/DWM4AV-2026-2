import React from 'react'
import { Link } from 'react-router'

export default function ItemPelicula({ pelicula }) {
    return (
        <tr>
            <td>{pelicula._id}</td>
            <td>{pelicula.title} </td>
            <td>{pelicula.primary_genre} </td>
            <td>{pelicula.year} </td>
            <td>
                <Link className='btn btn-primary' to={`/productos/${pelicula._id}`} >Ver</Link>
            </td>
        </tr>
    )
}
