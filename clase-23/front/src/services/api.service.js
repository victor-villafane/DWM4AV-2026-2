export function call(uri, method = "GET", body = undefined) {
    return fetch("http://localhost:2026/api" + uri, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + JSON.parse(localStorage.getItem("usuario"))?.token
        },
        body: JSON.stringify(body)
    })
        .then((res) => {
            if (!res.ok) throw new Error()
            else return res.json()
        })
}