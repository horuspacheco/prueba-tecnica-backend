# Prueba Tecnica - Backend Developer

Bienvenido/a a la prueba tecnica para la posicion de **Backend Developer**. Esta prueba evalua tus habilidades en Node.js, TypeScript, NestJS, Express.js, PostgreSQL, Docker y arquitectura de microservicios.

## Como empezar

1. Haz un **fork** de este repositorio a tu cuenta de GitHub.
2. Clona tu fork localmente.
3. Lee [docs/01-requisitos-perfil.md](docs/01-requisitos-perfil.md) para entender el perfil esperado.
4. Lee [docs/02-prueba-practica.md](docs/02-prueba-practica.md) para las instrucciones completas de la prueba.
5. Lee [docs/03-instrucciones-entrega.md](docs/03-instrucciones-entrega.md) para saber como entregar tu solucion.

## Tiempo Limite

**8 horas** desde el momento en que se comparte este repositorio con el candidato.

Exitos.

## Notas de configuración local

Después de clonar tu fork debes:

1. Instalar las dependencias de los servicios (desde cada carpeta del servicio):

```
cd payment-service
npm install
cd ../api-gateway
npm install
cd ../notification-service
npm install
```

2. Generar el cliente de Prisma y ejecutar las migraciones (payment-service):

```
cd payment-service
npx prisma generate
# Si quieres ejecutar la migración inicial localmente:
npx prisma migrate dev --name init
```

3. Iniciar con docker-compose o ejecutando los servicios individualmente.

Ejecutar con Docker Compose:

```
docker-compose up --build
```

Si algo falla durante la compilación, revisa el `package.json` de cada servicio y asegúrate de que las dependencias estén instaladas.
## Requisitos previos: crear la red y volúmenes de Docker

Este proyecto espera que exista una red externa de Docker llamada `general_network` y dos volúmenes con nombre usados por los archivos `postgres.yaml` y `redis.yaml`. Créalos antes de ejecutar `docker-compose up --build`.

Windows (cmd.exe):
```
docker network ls | findstr general_network
docker network create --driver bridge --subnet 172.18.0.0/16 general_network

docker volume ls | findstr postgres_vector_data || docker volume create postgres_vector_data
docker volume ls | findstr redis_data || docker volume create redis_data
```

PowerShell / Linux / macOS:
```
docker network ls | grep general_network || docker network create --driver bridge --subnet 172.18.0.0/16 general_network

docker volume ls | grep postgres_vector_data || docker volume create postgres_vector_data
docker volume ls | grep redis_data || docker volume create redis_data
```

Notas:
- Los archivos `postgres.yaml` y `redis.yaml` son definiciones de servicios independientes. Inícialos por separado antes del `docker-compose.yml` principal si quieres que la base de datos y Redis estén disponibles primero:
	- `docker compose -f postgres.yaml up -d`
	- `docker compose -f redis.yaml up -d`
- Después de que la base de datos y Redis estén en funcionamiento, inicia la pila principal:
	- `docker-compose up --build`

