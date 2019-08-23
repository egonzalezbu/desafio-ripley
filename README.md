# Desafío Ripley

## Demo

La aplicación se encuentra deployeada en [Heroku](https://desafio-ripley-egonzalez.herokuapp.com/).

---

## Tecnologías utilizadas

* Back-end
    * NodeJs con Express
    * Caché en Redis

* Front-End
    * Angular
---

## Firebase

Se implementó un login con Firebase en base a una combinación de Correo/Contraseña. El sitio se dejó de estilo "privado" impidiendo poder ver el contenido sin estar logueado.

La API valida la presencia y validez del token Firebase enviado desde el front antes de procesar cualquier solicitud.

---

## Productos

Los _SKUs_ de los productos fueron obtenidos de forma "manual" mediante un script y fueron cargados de manera estática en la API.

---

## Código

Tanto el código del front como del back se encuentran en este mismo repositorio por motivos de simpleza.

---

## Variables de Entorno

* `PORT`: Puerto para iniciar la API.
* `REDIS_HOST`: Host del servicio de Redis.
* `REDIS_PORT`: Puerto del servicio de Redis.

---

## Deploy

El código se puede ejecutar utilizando `node >= 10` simplemente instalando las dependencias con `npm ci` y luego ejecutando el servidor mediante `node .`

---

## Tests

La aplicación no cuenta con tests.