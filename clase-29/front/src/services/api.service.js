export function call(uri, method = "GET", body = undefined) {
    const url = import.meta.env.VITE_API_URL ?? "http://localhost:2026/api"
    const esFormulario = body instanceof FormData
    console.log(esFormulario)

    const headers = {
        "authorization": "Bearer " + JSON.parse(localStorage.getItem("usuario"))?.token
    }

    if (!esFormulario) headers["Content-Type"] = "application/json"

    return fetch(url + uri, {
        method: method,
        headers: headers,
        body: esFormulario ? body : JSON.stringify(body)
    })
        .then((res) => {
            if (!res.ok) throw new Error()
            else return res.json()
        })
}