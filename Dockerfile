# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y lock para instalación más rápida si no cambia código
COPY package*.json ./

# Instalar dependencias (excluyendo dev)
RUN npm install --frozen-lockfile

# Copiar todo el código
COPY . .

# Compilar el proyecto
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expone el puerto donde corre NestJS (por default 3000)
EXPOSE 3000

# Comando de arranque
CMD ["node", "dist/main.js"]