# Alegra Image Race

Este proyecto utiliza Vue 3 con Vite. La empresa “Imágenes del mundo” ha realizado un concurso para sus vendedores, ¡una carrera para encontrar las imágenes más interesantes de la web!

## Configuración del entorno

Antes de ejecutar el proyecto, sigue estos pasos:

1. Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
2. Crea una cuenta en [Unsplash](https://unsplash.com/) y obtén una **Access Key** desde el panel de desarrollador. Consulta la documentación oficial de la API aquí: [Unsplash API Documentation](https://unsplash.com/documentation).
3. Copia el archivo `.env.template` y renómbralo a `.env`.
4. Edita el archivo `.env` y reemplaza los valores de `VITE_ALEGRA_API_TOKEN` y `VITE_UNSPLASH_ACCESS_KEY` con tus credenciales reales.
5. Instala las dependencias del proyecto.

```sh
npm install
```

## Inicio del proyecto en desarrollo

Para ejecutar el servidor en modo desarrollo con recarga en caliente:

```sh
npm run dev
```

## Compilación para producción

Para compilar el proyecto y optimizarlo para producción:

```sh
npm run build
```

## Pruebas unitarias con [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Linter con [ESLint](https://eslint.org/)

Para verificar y corregir errores de estilo de código:

```sh
npm run lint
```

## 📌 Limitaciones de Unsplash

Debido a las restricciones del uso gratuito de Unsplash, solo se pueden consultar un máximo de 30 imágenes por búsqueda. Esto limita la cantidad de vendedores en la carrera a un máximo de 4 participantes simultáneamente.

## 🛠️ Stack Tecnológico

Este proyecto está construido con las siguientes tecnologías:

- [![Vue.js][vue-badge]][vue-url] - Framework progresivo para interfaces de usuario.
- [![Typescript][typescript-badge]][typescript-url] - Superset de JavaScript con tipado estático.
- [![Tailwind CSS][tailwind-badge]][tailwind-url] - Framework de utilidades CSS para un diseño ágil.
- [![Vitest][vitest-badge]][vitest-url] - Pruebas unitarias rápidas y eficientes para Vue y TypeScript.
- [![Playwright][playwright-badge]][playwright-url] - Framework para pruebas end-to-end.

<hr/>

Hecho con ❤️ por Pedro Yanez. Casi todos los derechos reservados...

<hr/>

#### Licencia

Este proyecto está bajo la Licencia privada, solo mi persona y el personal de Alegra tienen permitido trabajar sobre él.

[vue-url]: https://vuejs.org/
[vue-badge]: https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&color=blue
[tailwind-url]: https://tailwindcss.com/
[tailwind-badge]: https://img.shields.io/badge/Tailwind-ffffff?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8
[vitest-url]: https://vitest.dev/
[vitest-badge]: https://img.shields.io/badge/Vitest-000000?style=for-the-badge&logo=vitest&logoColor=white
[playwright-url]: https://playwright.dev/
[playwright-badge]: https://img.shields.io/badge/Playwright-2563EB?style=for-the-badge&logo=playwright&logoColor=white
