import React from 'react'

export default function ItemLoading() {
    return (
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </td>
            <td></td>
        </tr>
    )
}
