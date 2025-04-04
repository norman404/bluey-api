# Etapa 1: Build
FROM node:22.10-alpine AS builder

WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos dependencias sin modificar el lock
RUN npm install --frozen-lockfile

# Copiamos todo el proyecto, incluido .env
COPY . .

# Compilamos la app
RUN npm run build

# Etapa 2: Producción
FROM node:22.10-alpine

WORKDIR /app

# Copiamos package.json y node_modules desde la etapa anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Copiamos el archivo .env
COPY --from=builder /app/.env .env

# Exponemos el puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/main.js"]