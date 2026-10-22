# 1. La url no hace refencia a la accion sino al recurso

    GET     /peliculas/nuevo ----------> X
    POST    /peliculas       ----------> ✅

    url ------> uri

# 2. HTTP

    GET         Obtener
    POST        Crear
    PUT         Reemplazar
    PATCH       Actualizar
    DELETE      Borrar

# 3. Formato de intercambio de datos json

# 4. HTTP STATUS CODES

    1xx -> informativos
    2xx -> OK
    3xx -> Redireccion
    4xx -> Error del Usuario
    5xx -> Error del Servidor

https://learning.postman.com/docs/getting-started/installation/install-app#install-postman-on-linux

https://aws.amazon.com/es/what-is/restful-api/

# Instalar dependecias prod ( dependencies ) + dev (devDependencies)
npm install

pnpm install

# Instalar en produccion
## npm 
npm install --omit=dev
## pnpm
pnpm install --prod

# Instalar una dependencia como desarrollo

## npm 
npm install nodemon -D

## pnpm 
pnpm install nodemon -D