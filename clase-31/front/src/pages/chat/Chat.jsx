import React from 'react'
import { useEffect } from 'react'
import io from "socket.io-client"
import { useUsuario } from '../../context/session.context'
import { useState } from 'react'
export default function Chat() {

    const usuario = useUsuario()
    const [usuarios, setUsuarios] = useState([])
    const [socket, setSocket] = useState(null)
    const [mensajes, setMensajes] = useState([])
    
    useEffect(() => {
        const socket = io(import.meta.env.VITE_BACK_URL || "http://localhost:2026")
        setSocket(socket)
        socket.emit("unirme", usuario.email)
        socket?.on("usuarios", (usuariosConectados) => setUsuarios(usuariosConectados))
        return () => socket.disconnect()
    }, [])

    useEffect(() => {
        socket?.on("mensaje", (nuevoMensaje) => {
            setMensajes((mensajes) => [...mensajes, nuevoMensaje])
        })
    }, [socket])

    const handleSubmit = (e) => {
        e.preventDefault()
        const nuevo = e.target.nuevo.value
        socket.emit("nuevo", { usuario: usuario.email, mensaje: nuevo, fecha: new Date() })
        e.target.nuevo.value = ""
    }

    return (
        <main className="container py-4 py-md-5">
            <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                    <div className="mb-4">
                        <span className="badge bg-primary-subtle text-primary-emphasis mb-2">Conversación en tiempo real</span>
                        <h1 className="h2 mb-1">Chat</h1>
                        <p className="text-body-secondary mb-0">Conversa con los usuarios conectados.</p>
                    </div>

                    <div className="row g-4">
                        <aside className="col-12 col-md-4 col-lg-3">
                            <section className="card h-100 shadow-sm">
                                <div className="card-header bg-body d-flex align-items-center justify-content-between py-3">
                                    <h2 className="h6 mb-0">Conectados</h2>
                                    <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">{usuarios.length}</span>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {usuarios.length > 0 ? usuarios.map((usuario, indice) => (
                                        <li className="list-group-item d-flex align-items-center gap-2" key={indice}>
                                            <span className="bg-success rounded-circle flex-shrink-0" style={{ width: "8px", height: "8px" }} aria-hidden="true" />
                                            <span className="text-break">{usuario}</span>
                                        </li>
                                    )) : (
                                        <li className="list-group-item text-body-secondary small">No hay usuarios conectados.</li>
                                    )}
                                </ul>
                            </section>
                        </aside>

                        <section className="col-12 col-md-8 col-lg-9" aria-label="Mensajes del chat">
                            <div className="card shadow-sm">
                                <div className="card-header bg-body py-3">
                                    <h2 className="h6 mb-0">Mensajes</h2>
                                </div>
                                <div className="card-body d-flex flex-column gap-3 overflow-auto bg-body-tertiary" style={{ minHeight: "320px", maxHeight: "55vh" }} aria-live="polite">
                                    {mensajes.length > 0 ? mensajes.map((mensaje, indice) => {
                                        const esPropio = mensaje.usuario === usuario.email
                                        return (
                                            <article className={`d-flex ${esPropio ? "justify-content-end" : "justify-content-start"}`} key={indice}>
                                                <div className={`rounded-3 px-3 py-2 ${esPropio ? "bg-primary text-white" : "bg-body border shadow-sm"}`} style={{ maxWidth: "85%" }}>
                                                    <p className="mb-1 text-break">{mensaje.mensaje}</p>
                                                    <div className={`small ${esPropio ? "text-white opacity-75" : "opacity-75"}`}>
                                                        {mensaje.usuario} · { new Date(mensaje.fecha).toLocaleString() }
                                                    </div>
                                                </div>
                                            </article>
                                        )
                                    }) : (
                                        <div className="text-center text-body-secondary my-auto py-5">
                                            <p className="mb-1">Aún no hay mensajes</p>
                                            <small>Envía el primero para iniciar la conversación.</small>
                                        </div>
                                    )}
                                </div>
                                <div className="card-footer bg-body p-3">
                                    <form onSubmit={handleSubmit}>
                                        <label className="visually-hidden" htmlFor="nuevo-mensaje">Escribe un mensaje</label>
                                        <div className="input-group">
                                            <input className="form-control" type="text" id="nuevo-mensaje" name="nuevo" placeholder="Escribe un mensaje..." autoComplete="off" />
                                            <button className="btn btn-primary px-4" type="submit">Enviar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}
