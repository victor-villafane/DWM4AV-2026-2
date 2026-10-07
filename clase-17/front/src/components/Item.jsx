import React from 'react'

export default function Item({moneda}) {
    return (
        <tr>
            <td><img width="100px" src={moneda.icon_url} alt={moneda.symbol} /> </td>
            <td>{moneda.symbol} </td>
            <td>{moneda.name} </td>
            <td>{moneda.name_full} </td>
            <td>{moneda.max_supply} </td>
        </tr>
    )
}
