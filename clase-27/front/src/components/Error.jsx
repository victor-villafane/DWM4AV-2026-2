import React from 'react'

export default function Error({mensaje}) {
    return (
        <div className="d-flex justify-content-center">
            <p className='fs-3' >{mensaje}</p>
        </div>
    )
}
