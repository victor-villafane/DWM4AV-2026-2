import React from 'react'

export default function Error({ err }) {
    if (err?.length > 0)
        return <p className='text-danger text-sm' >{err}</p>
    else
        return <></>
}
