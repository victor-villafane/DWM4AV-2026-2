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