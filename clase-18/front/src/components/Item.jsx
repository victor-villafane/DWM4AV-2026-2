import React from 'react'
import { Link } from 'react-router'

export default function Item({ producto }) {
    return (
        <tr>
            <td><img width="100px" src={producto.image} alt={producto.title} /> </td>
            <td>{producto.title} </td>
            <td>{producto.price} </td>
            <td>
                <Link className='btn btn-primary' to={`/productos/${producto.id}`} >Ver</Link>
            </td>
        </tr>
    )
}
