# Consultora RR.HH. PePe Project
- [Sintaxis elegante para esta documentación](https://docs.github.com/es/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Repositorio en GITHUB](https://github.com/sergioarieljuarez/rrhh-express-react)

![alt text](./docs/pepe-docs.png)

## Ambiente de DESARROLLO

#### Puertos de conexión utilizados para "localhost" (127.0.0.1)
**PC**:DOCKER
1. **3306**:3306 <-- MySQL Database Engine Server - "mysql_service" or "mysql_service_b"
2. **8080**:8080 <-- MySQL Database Web Adminer - "admindb_service" or "admindb_service_b"
3. **4000**:4000 <-- API Server Express JS - "api_service"
4. **3000**:3000 <-- WEB Server React JS - "web_service"

#### Comandos utiles durante el desarrollo:

1. Ver logs del contenedor que desee y que este corriendo en Docker:
```
# Listar contenedores que estan corriendo actualmente en Docker, ejecute:
docker ps

# Puede ver logs del contenedor desado, ejecute:
docker logs --tail 100 -f ${NOMBRE_CONTENEDOR} 

# NOMBRE_CONTENEDOR puede ser una de las siguientes opciones: 
# ["mysql_service", "admindb_service", "api_service", "web_service"]
# Ejemplo:
docker logs --tail 100 -f api_service

# Finaliza el monitor de este proceso combinando las teclas "CTRL + C"
```

2. Cómo iniciar el "mysql_service" + "admindb_service" para programar localmente:
```
# pararse en el directorio correspondiente, ejecute:
cd ./mysql_service 
# iniciar el servicio manualmente con este comando, ejecute:
docker-compose up
```

3. Cómo iniciar el "api_service" para programar localmente:
```
# pararse en el directorio correspondiente, ejecute:
cd ./api_service 
# iniciar el servicio manualmente con este comando, ejecute:
yarn && yarn dev
```

4. Cómo iniciar el "web_service" para programar localmente:
```
# pararse en el directorio correspondiente, ejecute:
cd ./web_service 
# iniciar el servicio manualmente con este comando, ejecute:
yarn && yarn dev
```

5. Cómo iniciar todos los servicios juntos (orquestar) modo DESARROLLO (dev):
```
# pararse en el directorio raiz "rrhh", y ejecute:
docker-compose up --build -f docker-compose_dev.yml
```

6. Cómo iniciar todos los servicios juntos (orquestar) modo PRODUCCION (prod):
```
# pararse en el directorio raiz "rrhh", y ejecute:
docker-compose up --build -f docker-compose.yml
# o simplemente en forma mas abreviada (docker-compose.yml es el nombre que se considera por defecto):
docker-compose up --build
```

### Requirimientos
1. DOCKER: Docker version 20.10.7, build f0df350
   - **Docker engine**: permite iniciar cada servicio en forma separada independiente uno de otro cada uno en su propio contenedor
   - **docker-compose**: orquestador para poder iniciar varios servicios de una sola vez y poder administrarlos
      - Servicio 1 (**MySQL** v5.0.7): instancia de **MySQL Database Server** - Database Engine
      
      - Servicio 2 (**Adminer** v4.8.1): administrador web para MySQL Database Server (similar a PHPmyadmin) - Database Adminer
      
      - Servicio 3 (Node JS v14.0 + **React** JS v17.00.02): **Client Web Server** - FrontEnd
      
      - Servicio 4 (Node JS v14.0 + **Express** JS v04.17.01): **API Web Server** - BackEnd
      
2. **NODE JS v14** (entorno de desarrollo para el desarrollo del producto)

3. **YARN**: gestor de paquetes dentro de nuestro proyecto web (añade o quita librerías, ejecuta scripts para correr el proyecto)
   
   - **REACT JS (Library)**: manejo de renderización para la vista en forma eficiente y elegante, y mayor modularidad. Con REACT se van desarrollando los tres aspectos en simultaneo para la vista web en un unico archivo JSX (facilitando el trabajo colaborativo en equipo):
      - LENGUAJE DE MARCADO: se escribe en React (JSX) que luego WEBPACK lo pasa a ficheros html5 (.HTML)
      - LENGUAJE DE ESTILO: se escribe en React (JSX) que luego WEBPACK lo pasa a ficheros css3 (.CSS)
      - LENGUAJE DE PROGRAMACIÓN: se escribe en React (JSX) que luego WEBPACK lo pasa a ficheros javascript (.JS)

   - **EXPRESS JS (Framework)**: manejo de las peticiones para lectura y manipulación de los datos que estan en la base MySQL
      - SERVIDOR API para la comunicación del Frontend React con los datos en MySQL Server
   
   - **MySQL engine (servidor de MySQL)**: almacenamiento de datos (persistencia de los mismos)
	mysql  Ver 14.14 Distrib 5.7.35, for Linux (x86_64) using  EditLine wrapper
### Otras herramientas necesarias para el desarrollo
- IDE Visual Studio Code de Microsoft (interfaz de desarrollo)
- Postman (para PROBAR las distintas funcionalidades de la API - sesiones de usuario, ABMC usuarios de cada tipo)
- GIT (control de versionado de codigo local) v02.25.01
- GITHUB (control de versionado para el acceso en forma colaborativa en la nube)


## Ambiente de PRODUCCIÓN

### Requirimientos para el despliegue del proyecto en el servidor

- WEBPACK (herramienta para NODE JS que copila el codigo y lo pasa a nativo para los navegadores - HTML, CSS, JS) - empaqueta todo el proyecto en ficheros que entiende o interpreta el navegador y asi poder ser desplegado y publicado en un servidor online en Internet

### Configuraciones previas para la publicación
- URL de acceso: [https://rrhh.masterpcweb.com](https://rrhh.masterpcweb.com)
- HOSTING:
    - Construcción de base de datos a usar en server MySQL del hosting (ejecución de scripts).
    - Preparando nuestra aplicación para el modo de producción con WEBPACK y el envío de estos ficheros vía SFTP hacia el servidor web del hosting.
    - Creación del fichero .htaccess en el server del hosting: nos permitirá configurar el servidor para usar las rutas del ReactRouter
    
### Requirimientos para la publicación en Internet
- INTERNET: para el acceso al producto ya desplegado y publicado en la web (servicio mensual)
- NOMBRE DE DOMINIO: es la URL o DIRECCION de acceso (nombre de ingreso desde el navegador web (servicio anual)
- HOSTING servicio de alojamiento web: Servidor corriendo con Linux Ubuntu Server 20.04 LTS con MySQL engine
- HOSTING servicio de certificado de conexión web: para una conexión segura entre navegador web cliente y servidor web

## Tareas pendientes por resolver:
- [x] USER LOGIN section (frontend)
- [x] USER REGISTRATION section (frontend)
- [ ] HOME section (frontend)
- [ ] CV data section  (frontend)
- [ ] ALTA NUEVO USUARIO en mysql database (backend)
- [ ] task 1 (backend)
- [ ] task 2 (backend)
- [ ] task 3 (backend)
- [ ] task 4 (frontend)
- [ ] task 5 (frontend)
- [ ] task 6 (frontend)



