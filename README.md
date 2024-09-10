# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# Código de Conducta

Nosotros nos regiremos por los siguientes principios en nuestras interacciones y contribuciones al proyecto:

### 1. Respeto Mutuo
Trataremos a todas las personas con respeto y cortesía, independientemente de su experiencia, habilidades o cualquier otro factor.

### 2. Comunicación Constructiva
Mantendremos una comunicación clara y constructiva. Evitamos el lenguaje ofensivo, ataques personales y comentarios despectivos. Valoramos las opiniones y críticas constructivas.

### 3. Colaboración
Fomentamos la colaboración y la cooperación entre los miembros del equipo para lograr el éxito del proyecto.

### 4. Resolución de Conflictos
Si surge un conflicto, lo resolveremos de manera constructiva. Si es necesario, involucramos a un tercero para mediar en el conflicto.

### 5. Reconocimiento de Contribuciones
Reconocemos y valoramos las contribuciones de todos los miembros del equipo.

## Convenciones para Commits
- Los commits deben tener descripciones breves que resuman claramente su contenido. Ejemplos: `signin-css`, `landing-carousel-jsx`, `calendar-css`.

## Convenciones para Nombres de Clases
- Las clases deben ser descriptivas y usar guiones bajos (`_`) para separar palabras. Ejemplo: `menu_container`, `button_primary`.

## Uso de Ramas
Utilizaremos las siguientes ramas para organizar el flujo de trabajo:

### `main`
- **Propósito:** Es la rama principal, siempre debe estar en un estado listo para producción y estable. Solo se debe fusionar código completamente probado y aprobado.
  
### `develop`
- **Propósito:** Rama de integración para nuevas características o correcciones. Es una "versión beta" que contiene el trabajo más reciente de todos, pero que aún no ha sido considerado lo suficientemente estable para producción.

### `feature/*`
- **Propósito:** Desarrollar nuevas características específicas. Cada característica debe tener su propia rama `feature`.
- **Ejemplo de nombre:** `feature/authentication`, `feature/ui-redesign`.
- **Flujo:**
  - Creación: Se crean a partir de `develop`.
  - Merge: Una vez completada y probada, se fusiona de vuelta en `develop`.
  - Convención: Prefijo `feature/` seguido de una descripción clara.

### `hotfix/*`
- **Propósito:** Solucionar problemas críticos y urgentes que deben aplicarse a la versión de producción en `main`. Usado para bugs críticos en producción.
- **Ejemplo de nombre:** `hotfix/critical-bug`, `hotfix/security-patch`.
- **Flujo:**
  - Creación: Se crean a partir de `main`.
  - Merge: Una vez completado el hotfix, se fusiona tanto en `main` como en `develop` para reflejar la corrección en la próxima versión en desarrollo.
  - Convención: Prefijo `hotfix/` seguido de una descripción clara del problema.
