import React from 'react'

export default function Error({ err }) {
    return err?.length > 0 ? <p className='text-danger text-sm' >{err}</p> : <></>
}
