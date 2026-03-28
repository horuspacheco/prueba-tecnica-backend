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

## Local setup notes

After cloning your fork you should:

1. Install dependencies for services (from each service folder):

```
cd payment-service
npm install
cd ../api-gateway
npm install
cd ../notification-service
npm install
```

2. Generate Prisma client and run migrations (payment-service):

```
cd payment-service
npx prisma generate
# If you want to run the initial migration locally:
npx prisma migrate dev --name init
```

3. Start with docker-compose or by running services individually.

Run using Docker Compose:

```
docker-compose up --build
```

If something fails during build, check each service's `package.json` and ensure dependencies are installed.
