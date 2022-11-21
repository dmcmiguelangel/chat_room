# Chat Room
## Authors

- [@dmcmiguelangel](https://github.com/dmcmiguelangel)


## Requerimientos

- Node Js v 18
- Vue Js v 2
- MongoDB Compass
## Instalación API

1.- Clonamos el repositorio

```bash
  git clone https://github.com/dmcmiguelangel/chat_room.git
```
2.- Dentro de la carpeta encontraremos dos directorios (api, front).

3.- Nos dirijimos al directorio "api" e instalamos las dependencias con el siguiente comando:

```bash
  npm install
```

4.- Al entrar al repositorio "api", veremos un archivo llamado ".env", dentro viene la configuración del puerto donde correrá el API, así como las credenciales de acceso para conectarnos a nuestra base de datos en MongoDB.

`PORT`

`DB_CONNECTION`

`DB_HOST`

`DB_PORT`

`DB_DATABASE`

5.- Pueden dejar la configuración tal cual, o cambiar el puerto y la conexión que utilizarán.

6.- El archivo llamado "app.js", es nuestro archivo principal, donde se crea la conexión con lo web sockets, rutas y conexión con MongoDB.

7.- Para probar nuestra API, ejecutamos el siguiente comando:

```bash
  node app.js
```
8.- En caso de utilizar nodemon, ejecutamos el siguiente comando:

```bash
  nodemon app.js
```
9.- Al ejecutar el comando anterior, nuestra API se ejecutará y en el CMD se mostrará el siguiente mensaje:

```bash
  Servidor corriendo en el puerto { puerto-seleccionado }
```

10.- Abrimos el navegador, y entramos al siguiente enlace http://localhost:3000/api, al entrar se mostrará el mensaje "Servidor corriendo".

## Instalación Front

1.- Nos dirijimos al directorio "front" e instalamos las dependencias con el siguiente comando:

```bash
  npm install
```

2.- Dentro del directorio, encontraremos un archivo ".env", dentro configuramos el BaseUrl de nuestra API, en este caso http://localhost:3000.

3.- Nos dirijimos a la siguiente ruta "front/src/services/", aquí encontraremos el archivo "socketio.service.js", con el siguiente cógido:
```javascript
setupConnection() {
    this.socket = io('http://localhost:3000', {
        transports: ['websocket'],
        forceNew: true,
        upgrade: false
    });
}
```

4.- Podemos ver que hacemos referencia a la dirección de nuestra API directamente en lugar de utilizar la que viene en el archivo ".env". Esto debido a que se integró un Interceptor, lo que implica que la conexión la intente hacer a la URL del proyecto front, en lugar de la URL del API.

5.- Ejecutamos el siguiente comando para ejecutar el proyecto front:

```bash
  npm run serve
```

6.- Una vez que se ejecute, veremos que se creará la siguiente URL http://localhost:8080, la abrimos en el navegador y se deberá mostrar el nuestra app.

7.- Se nos solicitará un nombre de usuario, puede utilizar el de su preferencia, damos clic en el botón "Ingresar" y listo.

8.- Una vez dentro veremos dos secciones al lado izquierdo, la primera llamada "Chats", aquí se verán los chats que se tenga con otros usuarios, y la otra es "Contactos", aquí se verán los demás contactos conectados.

9.- Si queremos iniciar una conversación, damos clic sobre el contacto que deseemos (sea en la sección "Chats" o "Contactos"), y poremos iniciar la conversación y, en caso de ya contar con una conversación, se mostrarán los mensajes enviados.