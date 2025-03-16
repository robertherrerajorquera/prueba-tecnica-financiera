# Introduccion

- Que es?: prueba tecnica de indicadores financieros.
- Plazo maximo entrega: 18 de marzo, 2025.
 
# Requisitos a cumplir

- El stack de herramientas Angular 7+.(se usa angular 16)
- Listado de indicadores financieros.
- Al seleccionar uno de los indicadores se deberá mostrar el detalle de este.
- Integración de framework:
    a. Material
    b. Bootstrap(se usara bootstrap)
- Aplicación de buenas prácticas:
    a. Organización de código
    b. Componentes
    c. Servicios
    d. Módulos
- Diseño y experiencia de usuario.
- Incluir un README para configuración.(Este mismo) 
- La aplicación debe contener los ejemplos 1, 2 y 3.
- Es necesario enviar los repositorios o códigos fuentes de tu preferencia.
- API para construcción de la aplicación: https://api.cmfchile.cl/index.html (toda la documentación de la API está en la página).
- La API requiere una API Key para ser utilizada. Puedes pedir una en el mismo sitio, o bien nosotros te podemos proveer una.
- Se recomienda implementar pruebas unitarias sobre el proyecto. (se usara karma)


## instrucciones basicas al generar proyecto angular
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


# paso a paso (basico)
- Se creo proyecto nuevo en mi repositorio de github con nombre: prueba-tecnica-financiera
- Se clono el proyecto en un directorio propio.
- Se creo el proyecto de angular base con: ng new prueba-tecnica-financiera --routing=true --style=scss --directory=./
    # explicacion comando creacion proyecto
    - ng new <nombreProyecto> -> crea un proyecto en una nueva carpeta llamada con el nombre de proyecto que se le dio, en este caso: prueba-tecnica-financiera
    - --routing= true -> agrega/genera un archivo nuevo llamado "app-routing" el cual tiene la base del rutaje de nuestro proyecto de angular.
    - style=scss -> por defecto se usa css, pero al hacer esto se difine scss como el preprocesador css, asi podremos hacer variables de estilo mas comodamente.
    - --directory=./ -> le decimos al comando que use el directorio alctual y no cree uno nuevo, asi se genera directamente en la carpeta que estamos.
