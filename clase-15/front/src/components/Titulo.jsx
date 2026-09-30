export default function Titulo({ texto, ...rest }) {
    return (
        <h1  {...rest} >{texto}</h1>
    )
}
