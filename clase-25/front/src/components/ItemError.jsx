import React from 'react'
import Error from './Error'

export default function ItemError() {
    return (
        <tr>
            <td></td>
            <td>
                <Error mensaje="Error al traer los productos" />
            </td>
            <td></td>
        </tr>
    )
}
