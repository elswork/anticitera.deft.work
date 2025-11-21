# Propuesta de Integración: Anticitera & Dominio

Este documento detalla las posibilidades de integración entre **anticitera.deft.work** (Sitio de Contenido/Marketing) y **dominio.deft.work** (Aplicación de Registro de Dominios).

## 1. Identidad Visual Compartida (Design System)
**Objetivo**: Unificar la apariencia para que el usuario sienta que navega por una única plataforma.

*   **Colores y Tipografía**: Extraer las variables CSS de `dominio` (en `index.css`/`App.css`) y replicarlas en `anticitera` (`public/css/index.css`).
*   **Componentes UI**: Replicar el estilo de los botones y tarjetas.
*   **Acción Inmediata**: Crear un archivo de "variables compartidas" o simplemente alinear los valores hex y familias tipográficas manualmente.

## 2. Navegación Cruzada (Cross-Navigation)
**Objetivo**: Facilitar el movimiento entre el sitio informativo y la aplicación.

*   **En Anticitera**:
    *   Añadir un botón prominente "Registrar Dominio" en el encabezado (`_includes/layouts/base.njk`) que enlace a `https://dominio.deft.work`.
    *   Añadir enlaces en el pie de página.
*   **En Dominio**:
    *   Añadir un enlace "Proyecto" o "Blog" en el `Navbar.jsx` que regrese a `https://anticitera.deft.work`.

## 3. Widget de Búsqueda de Dominios
**Objetivo**: Capturar el interés del usuario directamente desde el contenido.

*   **Implementación**:
    *   Crear un formulario simple en la página de inicio de `anticitera` (HTML/JS vanilla).
    *   Al enviar, redirigir a `https://dominio.deft.work?search=[termino]`.
    *   **Requisito en Dominio**: Modificar `App.jsx` o la página principal de `dominio` para leer el parámetro URL `search` y pre-llenar/ejecutar la búsqueda.

## 4. Estadísticas en Tiempo Real
**Objetivo**: Mostrar prueba social en el sitio de marketing.

*   **Implementación**:
    *   Crear una Cloud Function en `dominio` que devuelva el conteo de dominios registrados (JSON público).
    *   Consumir este JSON desde `anticitera` usando `fetch()` y mostrar el número en el frontend.
    *   *Alternativa Estática*: Usar un script de build en Eleventy que consulte Firebase al momento de compilar (menos dinámico, pero más seguro/rápido).

## 5. Autenticación Unificada (Futuro)
*   Si `anticitera` requiere login (ej. para comentarios o contenido exclusivo), usar el mismo proyecto de Firebase Auth que `dominio`.

---

## Plan de Acción Recomendado

1.  **Fase 1 (Rápida)**: Unificar estilos básicos (CSS) y añadir enlaces de navegación cruzada.
2.  **Fase 2 (Funcional)**: Implementar el Widget de Búsqueda (requiere cambios en ambos proyectos).
3.  **Fase 3 (Avanzada)**: Integración de estadísticas y datos en tiempo real.
