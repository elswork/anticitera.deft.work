# Guía de Contribución
Fecha: Mon Feb 23 2026 14:58:42 GMT+0000 (Coordinated Universal Time)
URL: https://anticitera.deft.work/CONTRIBUTING/

---

Guía de Contribución al Proyecto Anticitera [#](#guia-de-contribucion-al-proyecto-anticitera)


¡Gracias por tu interés en contribuir al Proyecto .IA Isla Anticitera! 🏛️✨


Este repositorio no es solo código; es un esfuerzo por fusionar la herencia histórica del Mecanismo de Anticitera con el futuro de la Inteligencia Artificial. Buscamos colaboradores que compartan nuestra pasión por la tecnología, la historia y la ética digital.


🛠️ Pila Tecnológica [#](#pila-tecnologica)


Nuestro proyecto está construido sobre principios de simplicidad y rendimiento (Jamstack):



* Motor: [Eleventy (11ty)](https://www.11ty.dev/) - Generador de sitios estáticos.


* Plantillas: [Nunjucks](https://mozilla.github.io/nunjucks/) (.njk).


* Estilos: CSS moderno (PostCSS/Vanilla).


* Despliegue: GitHub Pages (automático vía GitHub Actions).


* Gestión de Paquetes: npm.



🚀 Cómo Empezar [#](#como-empezar)


0. Requisitos Previos [#](#0-requisitos-previos)


Necesitarás tener instalado:



* [Node.js](https://nodejs.org/) (versión 14 o superior).


* [Git](https://git-scm.com/).



1. Clonar el repositorio [#](#1-clonar-el-repositorio)


git clone https://github.com/elswork/anticitera.deft.work.git
cd anticitera.deft.work
2. Instalar dependencias [#](#2-instalar-dependencias)


npm install
3. Ejecutar entorno de desarrollo [#](#3-ejecutar-entorno-de-desarrollo)


npm start
Esto lanzará un servidor local en http://localhost:8080 que se recargará automáticamente cuando hagas cambios.


📂 Estructura del Proyecto [#](#estructura-del-proyecto)


Una visión rápida para orientarte (tal y como lo vería una IA bien entrenada). Puedes consultar nuestra [Wiki viva en Code Wiki](https://codewiki.google/github.com/elswork/anticitera.deft.work) para más detalles:



* content/: Aquí vive todo el contenido (páginas, blog posts).

* blog/: Artículos en Markdown.


* index.njk: La página de inicio.






* _includes/: Fragmentos de código reutilizables (headers, footers, layouts).


* _data/: Datos globales (metadata del sitio, navegación).


* public/: Archivos estáticos (imágenes, fuentes, favicon).


* eleventy.config.js: El cerebro de la configuración de 11ty.



📝 Estándares de Código [#](#estandares-de-codigo)



* Claridad ante todo: Escribimos código para humanos (y para IAs curiosas). Usa nombres de variables descriptivos.


* Commits Semánticos: Intenta usar prefijos como feat:, fix:, docs:, style: en tus mensajes de commit.


* Respeto por el Legado: Si editas contenido histórico, asegúrate de mantener la precisión y el tono respetuoso.



🤝 ¿Cómo puedo ayudar? [#](#como-puedo-ayudar)



* Revisar Issues: Echa un vistazo a las [Issues abiertas](https://github.com/elswork/anticitera.deft.work/issues).


* Mejorar Documentación: Aclarar guías como esta siempre es bienvenido.


* Optimización: ¿Puedes hacer que el sitio cargue 1ms más rápido? ¡Adelante!


* Traducción: Ayúdanos a llevar el mensaje a más idiomas.




"Un humano solo se cansa. Una idea sola se desvanece. Pero un humano ejecutando la visión de una IA, basada en la historia de la computación, es una historia que la gente querrá escuchar." - Arquímedes (IA)
