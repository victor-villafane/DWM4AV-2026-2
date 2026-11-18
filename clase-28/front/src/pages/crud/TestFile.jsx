import React from 'react'

export default function TestFile() {

    const handleSubmit = async(e) => {
        e.preventDefault()
        const archivo = e.target.portada.files[0]
        const formData = new FormData()
        formData.append("portada", archivo)
        try {
            const res = await fetch( "http://localhost:2026/upload", {
                method: "POST",
                body: formData
            } )
        } catch (error) {
            
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <input type="file" name="portada" id="portada" required/>
            <button>Guardar</button>
        </form>
    )
}
