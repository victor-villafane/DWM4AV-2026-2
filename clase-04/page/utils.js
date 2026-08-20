export function createPage(title, content) {
    let html = ""
    html += "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'>"
    html += `<title>${title}</title></head><body>`
    html += `<h1>${title}</h1>`
    html += content
    html += "</body></html>"
    return html
}

export function createList(lista) {
    let html = "<ul>"
    lista.forEach(alumno => html += "<li>Nombre: " + alumno.nombre + " Nota: " + alumno.nota + "</li>" )
    html += "</ul>"
    return html
}

export function createListPersonajes(lista) {
    let html = "<ul>"
    lista.forEach(item => html += "<li>Nombre: " + item.name + " Casa: " + item.house + "</li>" )
    html += "</ul>"
    return html
}

export default {createPage, createList}