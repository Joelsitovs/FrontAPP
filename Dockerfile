# Imagen base liviana de Node.js
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos estáticos de Angular ya compilados
COPY dist2/FrontApp/browser /app

# Instala el servidor estático 'serve' globalmente
RUN npm install -g serve

# Expone el puerto 8080 para acceder desde afuera
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["serve", "-s", ".", "-l", "8080"]
