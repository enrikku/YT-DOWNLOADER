# 🎵 YT-DOWNLOADER - API para descargar o transmitir videos de YouTube 🎥

Este repositorio contiene **dos versiones** de una API para manejar descargas de YouTube:

1. 📥 **Download API** - Descarga el video/audio en el servidor y luego lo envía al usuario.
2. 📡 **Stream API** - Transmite el video/audio directamente al usuario sin necesidad de almacenarlo en el servidor.

---

## 📂 Estructura del Proyecto

```
YT-DOWNLOADER/
│── download-api/   # API que descarga archivos en el servidor antes de enviarlos
│── stream-api/     # API que solo transmite el contenido sin almacenarlo
│── README.md       # Este archivo de documentación
```

---

## 🚀 **Requisitos Previos**

Antes de ejecutar la API, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (gestor de paquetes de Node)

---

## 🛠 **Instalación**
Clona este repositorio en tu máquina:

```bash
git clone https://github.com/tu-usuario/YT-DOWNLOADER.git
cd YT-DOWNLOADER
```

Instala las dependencias para ambas APIs:

```bash
npm install --prefix download-api
npm install --prefix stream-api
```

---

## 🎬 **Ejecutar cada API**

### 📥 **Ejecutar la API de Descarga (Download API)**
```bash
npm --prefix download-api start
```
O manualmente:
```bash
cd download-api
node index.js
```

Esta API descarga el archivo antes de enviarlo.

---

### 📡 **Ejecutar la API de Streaming (Stream API)**
```bash
npm --prefix stream-api start
```
O manualmente:
```bash
cd stream-api
node index.js
```

Esta API transmite directamente el audio/video sin almacenarlo.

---

## 🔥 **Ejecutar ambas APIs al mismo tiempo**
Si deseas ejecutar ambas APIs simultáneamente, usa el paquete **concurrently**:

```bash
npm install -g concurrently
```

Luego, ejecuta:

```bash
concurrently "npm --prefix download-api start" "npm --prefix stream-api start"
```

Esto iniciará ambas APIs en la misma terminal.

---

## 🛠 **Uso de la API**
Una vez que la API esté en ejecución, puedes acceder a los endpoints:

### **Download API**
- Descargar MP4:  
  ```
  GET http://localhost:3000/downloadmp4/{VIDEO_ID}
  ```
- Descargar MP3:  
  ```
  GET http://localhost:3000/downloadmp3/{VIDEO_ID}
  ```

### **Stream API**
- Transmitir MP4:  
  ```
  GET http://localhost:3000/downloadmp4/{VIDEO_ID}
  ```
- Transmitir MP3:  
  ```
  GET http://localhost:3000/downloadmp4/{VIDEO_ID}
  ```

Ejemplo en el navegador:
```
http://localhost:3000/downloadmp3/dQw4w9WgXcQ
```