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
- Se instalara bootstrap version 5
  npm i bootstrap@5.3.3
- Se importa en el scss global.
- Se crean modulo y componente de:
  - home : donde se cargaran todos la lista general
  - errorPage : donde se muestran los errores posibles
  - detalleGeneral : se muestra el detalle de los valores para el indicador seleccionado. se ingresa a travez de su nombre.
  - detalleEspecifico : se muestra el detalle de un indicador en particular. Al seleccionar el icono a un costado, segun el pdf esta al lado izq. pero en la imagen de referencia esta al lado derecho.
  # explicacion comando creacion modulo componente
  - Primero en la consola nos posicionamos en el directorio donde crearemos el modulo y/o componente. en nuestro caso dentro de "prueba-tecnica-financiera\src\app\components" ya que aqui tendremos nuestros componentes.
  - ng generate module <nombreDelModulo> => para crear un modulo, ejemplo: para crear el modulo home, ng generate module home y se creara el modulo en el directorio que estes estes posicionado.
  - ng generate component <nombreDelComponente> => se crea un componte, ejemplo: para crear el componente home, ng generate component home y se creara el componente en el directorio que estes posicionado.

## orden de trabajo

- Se creara cada vista propuesta en el pdf en el orden propuesto. La primera vista se mostrara en el componente home, la segunda vista en el componente detalleGeneral y la tercera vista en detalleEspecifico. Para poder avanzar con la informacion en la mano por asi decirlo, para esto se generara un nuevo servicio el cual nos permitira el acceso a la informacion de la api de la url que se menciono mas arriba.
- Generacion de servicio para el consumo de la api:
  ng g service usoApi
- Generacion de un modelo para definir cada propiedad y evitar el uso de any.
  ng g interface indicadores
- Modificacion de routing para redireccionar entre componentes
- Creacion de funciones base para uso de servicio con API
- Instalación de iconos para usar font-awesome :
  npm install @fortawesome/free-solid-svg-icons => instala los iconos free-solid-svg-icons de Font Awesome
  npm install @fortawesome/angular-fontawesome@0.13.0 => te da un componentne para usar fontawesome en el proyecto
- Creación de lista de indicadores en home, para poder redireccionar a la informacion del detalle de la api.
- Creación de funciones base para controlar fechas para las consultas
- Creación de interfaz para el dolar
- returno de consulta segun interfaz 

## Dato

- Se puede usar la inicial de cada propiedad a trabajar con ng, para ser mas especifico, como ejemplo:
   generate => g,
   component => c, 
   services => s, 
   interfaces => i.

   url de referencia para mas detalles: https://docs.angular.lat/cli/generate.
