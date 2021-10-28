# Consultora RR.HH. PePe Project
- [Sintaxis elegante para esta documentación](https://docs.github.com/es/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Repositorio en GITHUB](https://github.com/sergioarieljuarez/rrhh-express-react)

![alt text](./docs/pepe-docs.png)

## Ambiente de DESARROLLO

#### Puertos de conexión utilizados para "localhost" (127.0.0.1)
**PC**:DOCKER
1. **9906**:3306 <-- MySQL db server - "db_mysql"
2. **8000**:8080 <-- MySQL db adminer - "db_adminer"
3. **4005**:4005 <-- Express api - "api_express"
4. **3005**:3005 <-- UI react - "ui_react"
5. **3050**:80 <-- NGINX reverse proxy - "proxy_nginx"

#### DOCKER y DOCKER-COMPOSE instalados en tu pc
Si tenes ya instalado docker en tu PC podes iniciar la aplicación completa siguiendo estos pasos:
Pararse en el directorio raíz del proyecto "rrhh" y luego en una terminal ejecutar:
```
  # la primera vez o si modificas algun archivo
  docker-compose up --build 
  # las siguientes veces
  docker-compose up 
```

#### Comandos útiles durante el desarrollo:

0. Cómo iniciar cada proyecto por separado como lo tenemos hasta el momento:
------------------------------
PC pepe es donde está el entorno instalado
para desarrollo
---------------
- él tiene instalado
  GIT
  DOCKER y docker-compose
  NODE
  NPM y YARN
  IDE de preferencia (visual studio code o intelli j idea o similar)
---------------
Por el momento usaran los
COMANDOS PARA LEVANTAR EL PROYECTO en cada
carpeta de cada servicio por separado
(necesitaras 3 terminales)
---------------
Antes que todo ya con el proyecto de git bajado
pararse en la rama que tiene lo que avanzamos hasta ahora:
git checkout dev

Primero pararse en el directorio raíz del proyecto en cada terminal y luego

* en la TERMINAL 1 ejecuta "db_mysql":
```
  cd db_mysql
  docker-compose up
```
Si ha ido bien en unos segundos estará disponible la base mysql 
por LOCALHOST:3306 para poder ingresar 
como user --> "root" y pass --> "root" a base rrhh1 
(rrhh la base original la tienen que generar con el 
script de pepe porque aun solo hemos usado la tabla "usuarios" para dar un alta hasta el momento)

* en la TERMINAL 2 ejecuta "api_express":
```
  cd api_express
  yarn
  yarn dev
```
Si ha ido bien en unos segundos estará disponible la API REST
por LOCALHOST:4005 para poder hacer las peticiones con el frontend ui_react
(si quieres ver si está levantada puedes entrar por el navegador a http://localhost:4005
y te respondería con un texto como mensaje en la pantalla)

* en la TERMINAL 3 ejecuta "ui_react":
```
  cd ui_react
  yarn
  yarn dev
```
Si ha ido bien en unos segundos (tarda un poquito más al comienzo) estará disponible la REACT APP ui_react
por LOCALHOST:3005 para poder hacer las peticiones con el frontend ui_react
(entrar por el navegador a http://localhost:3005
y te responderá con un texto como mensaje en la pantalla)

* en cada TERMINAL detiene cada servicio con:
```
  CTRL + C (al menos en la terminal de linux es asi)
  ... o cierra la terminal
```


1. Ver logs del contenedor que desee y que esté corriendo en Docker:
```
# Listar contenedores que estan corriendo actualmente en Docker, ejecute:
docker ps

# Puede ver logs del contenedor desado, ejecute:
docker logs --tail 100 -f ${NOMBRE_CONTENEDOR} 

# NOMBRE_CONTENEDOR puede ser una de las siguientes opciones: 
# ["db_mysql", "db_adminer", "api_express", "ui_react"]
# Ejemplo:
docker logs --tail 100 -f api_express

# Finaliza el monitor de este proceso combinando las teclas "CTRL + C"
```

2. Cómo iniciar el "db_mysql" + "db_adminer" para programar localmente:
```
# pararse en el directorio correspondiente, ejecute:
cd ./db_mysql 
# iniciar el servicio manualmente con este comando, ejecute:
docker-compose up
```

3. Cómo iniciar el "api_express" para programar localmente:
```
# pararse en el directorio correspondiente, ejecute:
cd ./api_express 
# iniciar el servicio manualmente con este comando, ejecute:
yarn 
yarn dev
```

4. Cómo iniciar el "ui_react" para programar localmente:
```
# pararse en el directorio correspondiente, ejecute:
cd ./ui_react 
# iniciar el servicio manualmente con este comando, ejecute:
yarn
yarn dev
```

5. Cómo iniciar todos los servicios juntos (orquestar) modo DESARROLLO (dev):
```
# pararse en el directorio raiz del proyecto (ej: E:/web-project/rrhh), y ejecute:
docker-compose -f docker-compose_dev.yml up --build
```

6. Cómo iniciar todos los servicios juntos (orquestar) modo PRODUCCIÓN (prod):
```
# pararse en el directorio raiz del proyecto (ej: E:/web-project/rrhh), y ejecute:
# en forma abreviada (docker-compose.yml es el nombre "default"):
docker-compose up --build
# o en forma completa (especifica el nombre de archivo con "-f"):
docker-compose up --build -f docker-compose.yml
```

### Requerimientos
1. DOCKER: Docker version 20.10.7, build f0df350
   - **Docker engine**: permite iniciar cada servicio en forma separada independiente uno de otro cada uno en su propio contenedor
   - **docker-compose**: orquestador para poder iniciar varios servicios de una sola vez y poder administrarlos
      - Servicio 1 (**MySQL** v5.0.7): instancia de **MySQL Database Server** - Database Engine
      
      - Servicio 2 (**Adminer** v4.8.1): administrador web para MySQL Database Server (similar a PHPmyadmin) - Database Adminer
      
      - Servicio 3 (Node JS v14.0 + **React** JS v17.00.02): **Client Web Server** - FrontEnd
      
      - Servicio 4 (Node JS v14.0 + **Express** JS v04.17.01): **API Web Server** - BackEnd
      
2. **NODE JS v14** (entorno de desarrollo para el desarrollo del producto)

3. **YARN**: gestor de paquetes dentro de nuestro proyecto web (añade o quita librería, ejecuta scripts para correr el proyecto)
   
   - **REACT JS (Library)**: manejo de renderización para la vista en forma eficiente y elegante, y mayor modularidad. Con REACT se van desarrollando los tres aspectos en simultáneo para la vista web en un único archivo JSX (facilitando el trabajo colaborativo en equipo):
      - LENGUAJE DE MARCADO: se escribe en React (JSX) que luego WEBPACK lo pasa a ficheros html5 (.HTML)
      - LENGUAJE DE ESTILO: se escribe en React (JSX) que luego WEBPACK lo pasa a ficheros css3 (.CSS)
      - LENGUAJE DE PROGRAMACIÓN: se escribe en React (JSX) que luego WEBPACK lo pasa a ficheros javascript (.JS)

   - **EXPRESS JS (Framework)**: manejo de las peticiones para lectura y manipulación de los datos que están en la base MySQL
      - SERVIDOR API para la comunicación del Frontend React con los datos en MySQL Server
   
   - **MySQL engine (servidor de MySQL)**: almacenamiento de datos (persistencia de los mismos)
	mysql  Ver 14.14 Distrib 5.7.35, for Linux (x86_64) using  EditLine wrapper
### Otras herramientas necesarias para el desarrollo
- IDE Visual Studio Code de Microsoft (interfaz de desarrollo)
- Postman (para PROBAR las distintas funcionalidades de la API - sesiones de usuario, ABMC usuarios de cada tipo)
- GIT (control de versionado de código local) v02.25.01
- GITHUB (control de versionado para el acceso en forma colaborativa en la nube)


>## Ambiente de PRODUCCIÓN

### Requerimientos para el despliegue del proyecto en el servidor

- WEBPACK (herramienta para NODE JS que compila el código y lo pasa a nativo para los navegadores - HTML, CSS, JS) - empaqueta todo el proyecto en ficheros que entiende o interpreta el navegador y asi poder ser desplegado y publicado en un servidor online en Internet

### Configuraciones previas para la publicación
- URL de acceso: [https://rrhh.masterpcweb.com](https://rrhh.masterpcweb.com)
- HOSTING:
    - Construcción de base de datos a usar en server MySQL del hosting (ejecución de scripts).
    - Preparando nuestra aplicación para el modo de producción con WEBPACK y el envío de estos ficheros vía SFTP hacia el servidor web del hosting.
    - Creación del fichero ".htaccess" en el server del hosting: nos permitirá configurar el servidor para usar las rutas del ReactRouter
    
### Requerimientos para la publicación en Internet
- INTERNET: para el acceso al producto ya desplegado y publicado en la web (servicio mensual)
- NOMBRE DE DOMINIO: es la URL o DIRECCIÓN de acceso (nombre de ingreso desde el navegador web (servicio anual)
- HOSTING servicio de alojamiento web: Servidor corriendo con Linux Ubuntu Server 20.04 LTS con MySQL engine
- HOSTING servicio de certificado de conexión web: para una conexión segura entre navegador web cliente y servidor web

## Tareas pendientes por resolver:
- [x] USER administrativo LOGIN section (frontend)
- [x] USER administrativo REGISTRATION section (frontend)
- [x] HOME section (frontend)
- [x] FOOTER component inside HOME section (frontend)
- [x] APPBAR component inside HOME section (frontend)
- [x] DOUBLE SIDEBAR component inside HOME section (frontend)
- [x] ALTA NUEVO USUARIO en mysql database (backend)
- [x] USER LOGIN con mysql database (backend)

- [ ] MENU "Consultas" para USER administrativo (frontend)
  - [ ] subMENU Postulantes menu Consultas (frontend)
  - [ ] subMENU Solicitantes menu Consultas (frontend)
  - [ ] subMENU Solicitudes menu Consultas (frontend)
  - [ ] subMENU Solicitudes-Postulantes menu Consultas (frontend)

- [ ] MENU "ABM" para USER administrativo (frontend)
  - [ ] subMENU Solicitudes menu ABM (frontend)
  - [ ] subMENU Datos menu ABM (frontend)
  - [ ] subMENU Antecedentes menu ABM (frontend)
