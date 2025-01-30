# IPSA 2025

Este proyecto utiliza Vue 2 y Vite para el desarrollo de una aplicación web moderna. Ha sido probado en **Windows 11**.

## 🚀 Instalación y Configuración

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión recomendada **LTS**).

1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/wotanCode/ipsa-chile-2025.git
   cd ipsa-chile-2025
   ```

2. **Instalar dependencias**
   ```sh
   npm install
   ```

## 🛠 Uso y Desarrollo

### 🔥 Ejecutar en modo desarrollo

```sh
npm run dev
```

Esto iniciará un servidor local con recarga en caliente en [http://localhost:5173](http://localhost:5173).

### 🔨 Compilar para producción

```sh
npm run build
```

Esto generó archivos optimizados en la carpeta `dist`.

### 👀 Previsualizar la versión de producción

```sh
npm run preview
```

Este comando sirve para ver la versión compilada antes de desplegarla.

## 🧪 Pruebas

### ✅ Ejecutar pruebas unitarias con Vitest

```sh
npm run test:unit
```

### 🔎 Ejecutar pruebas End-to-End con Cypress

```sh
npm run build
npm run test:e2e # o `npm run test:e2e:ci` para pruebas en modo headless
```

## 🔍 Linter y chequeo de tipos

### ✨ Ejecutar ESLint para revisar errores en el código

```sh
npm run lint
```

### 🔍 Chequeo de tipos con TypeScript

```sh
npm run type-check
```

## 🚀 Despliegue en GitHub Pages

El proyecto se puede desplegar en GitHub Pages ejecutando:

```sh
npm run deploy
```

Luego, la aplicación estará disponible en:

```
https://wotanCode.github.io/ipsa-chile-2025/
```

## 📄 Configuración adicional

Para más información sobre la configuración de Vite, visita la [documentación oficial](https://vitejs.dev/config/).

