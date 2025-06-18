# Trabajo Practico Integrador.

 Aplicacion web para la gestion de pacientes y turnos medicos.

# Vercion desplegada: >>> https://unimedtpi-production.up.railway.app/

# Estructura del Proyecto:
 Para la composicion del mismo se han implementado tecnologias como express.js, sequelize y mysql2 para la conformacion del 
backend, y pug, css y javascript para la composicion del frontend.

>> Carpeta /*config*/ se podran encontrar las configuraciones tanto para express <app.js> como para sequelize <bdd.js>, y sequelize-cli <config.json>.

>> Carpeta /*controls*/, estaran disponibles los respectivos controladores de cada modelo sequelize.

>> Carpeta /*model*/, estaran definidos todos los modelos sequelize. Dentro del archivo <index.model.js> se insatncian y relaciona cada uno de ellos, tambies es desde este archivo que se realiza la exportacion de los mismos para podes ser usados en los controladores.

>> Carpeta /*public*/, podran encontrar las imagenes, los archivos .js y los estilos concernientes al proyecto. En ./public/scripts podremos encontrar el archivo <admission.js>, el mismo es el encargado de manejar toda las interacciones del endpoint principal.  (Cabe destacar que esta estructura aun no esta del todo definida, falta optimizarla y organizarla mejor.).

>> Carpeta /*routers*/, contiene todos los endpoint que el proyecto necesita para poder funcionar.

>> Carpeta /*sedders*/, se encuentran definidos los datos para poblar las tablas en la base de datos.

>> Carpeta /*views*/, como se puede ver la pagina se compone de un layout principal, el cual contiene la tabla (table) que usaran todos los actores para poder acceder a la informacion de cada paciente de manera mas comoda, y en admission, para evitar los problemas de identado de pug se opto por un diseño modularizado, aunque su estructura tampoco esta definida aun, ya que tambien necesita ser optimizada.

>> Archivos complementarios:
  >>> /*.env*/ desde este se podran manipular todos los datos de la configuracion.
  >>> /*.env.sample*/ especifica los datos que se necesitan para poder correr la aplicacion correctamente, agiliza la definicion de estos al levantar la aplicacion y proporciona mayor seguridad ayudando a evitar que si filtre informacion delicada.
  >>> /*.gitignore*/
  >>> /*package-lock.json*/
  >>> /*package.json*/
  >>> /*config.js*/ en el se a definido un objeto que reune todos los datos necesarios para el funcionamiento de la aplicacion, de momento se puede encontrar la infomracion necesaria para configurar sequelize, y express por medio del archivo /*.env*/.
  >>> /*index.js*/ se encarga de levantar la aplicacion.

# Instalacion y Ejecucion Local:
1). clonar el repositorio:
  <git clone https://github.com/int-ExIT/UniMedTPI>

2). Instalar las dependencias por medio del comando:
  <npm install>

3). Completar los datos del archivo .env con los siguientes datos:
  # Variables para Express
  VIEW_ENGINE=pug
  PORT=8000

  # Variables para MySQL
  SQL_HOST=localhost
  SQL_BOARD=/*nombre de la tabla*/
  SQL_USER=root
  SQL_PASSWORD=
  SQL_PORT=3306

  # Variables para Sequelize
  SEQUELIZE_DIALECT=mysql

4). Descomentar la linea 39 del archivo ./models/index.model.js. Luego ejecutar el comando:
  <npm run start:db>
 Esto creara las tablas que la aplicacion necesitara para poder trabajar.

5). Poblar las tablas por medio de las seeds ejecutando el comando:
  <npm run seed>

6). Finalmente cambiar la URL_BASE ubicada en el archivo ./public/scripts/admission.js (linea 3), por 'localhost:' y a continuacion el puerto en el que se a decidido levantar el servidor de express.

# Tecnologias Usadas:
  >> HTML, CSS y javascript.
  >> express, sequelize y mysql2.
  >> pug.

# Endpoint Principales
  >> GET /patient/get-one/:dni -> Recupera un paciente de la base de datos.
  >> GET /patient/get-all/:dni -> Recupera todos los pacientes que NO posean una admision.
  >> GET /get-all/:patient_dni/:filter -> Recupera todas las admisiones. Se puede elegir entre recuperar todas las admiciones de pacientes que ya han sido dados de alta, o todas las admisiones de los internos.
  >> GET /patient/get-all-user -> Recupera todas las admisiones pendientes, es decir, turnos que han sido dados a distintos pacientes.


<Desarrollado por /Torres /Ignacio /41682078>