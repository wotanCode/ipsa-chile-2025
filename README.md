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

Se recomienda no usar la consola de VSCode.

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

## 🛠️ Stack Tecnológico
- [![Vue][vue-badge]][vue-url] Un framework progresivo para construir interfaces de usuario dinámicas.
- [![Vite][vite-badge]][vite-url] Un entorno de desarrollo rápido y ligero.
- [![Typescript][typescript-badge]][typescript-url] JavaScript con tipado estático para mayor seguridad y claridad.
- [![Cypress][cypress-badge]][cypress-url] Un framework de pruebas End-to-End.
- [![Vitest][vitest-badge]][vitest-url] Un framework de pruebas unitarias rápido y ligero.

## 📄 Configuración adicional

Para más información sobre la configuración de Vite, visita la [documentación oficial](https://vitejs.dev/config/).

<hr />
Hecho con ❤️ amor.
Casi todos los derechos reservados...

📄 Licencia
Este proyecto está bajo la Licencia MIT.

[vue-url]: https://vuejs.org/
[vue-badge]: https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white

[vite-url]: https://vitejs.dev/
[vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white

[typescript-url]: https://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white

[cypress-url]: https://www.cypress.io/
[cypress-badge]: https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white

[vitest-url]: https://vitest.dev/
[vitest-badge]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
