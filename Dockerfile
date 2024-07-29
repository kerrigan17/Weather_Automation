# Usa una imagen base con Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Construye la aplicación React
RUN npm run build

# Usa una imagen base más ligera para servir la aplicación
FROM nginx:alpine

# Copia los archivos de construcción a la carpeta de nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Expone el puerto en el que Nginx estará escuchando
EXPOSE 80

# Inicia Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]
