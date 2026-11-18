import { Link } from 'react-router'

export default function DetalleProducto({ producto }) {
    return (
        <>
            <div className='row' >
                <div className='col-12 col-md-6 col-lg-4' >
                    <img style={{maxWidth: "250px"}} src={producto.image} alt={producto.title} />
                </div>
                <div className='col-12 col-md-6 col-lg-8'>
                    <h2>{producto.title}</h2>
                    <p>${producto.price}</p>
                    <p>{producto.category}</p>
                    <p>{producto.description}</p>
                    <button className='btn btn-outline-success' >Comprar</button>
                </div>
            </div>
            <Link to="/productos" className="btn btn-outline-primary mt-5" >Volver</Link>
        </>
    )
}
