# Develop the project

## Setup

- Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

- Update the environment variables:

```bash
nano .env
```

## Start

- Start the Docker containers required for development (using the development stack):

```bash
docker-compose -f docker-compose.dev.yml up
```

> **Note:**
> You can use the `-d` option to run containers in the background.

> **Note:**
> You can use the `--build` option to force container images to be rebuilt.

- Start the SSH tunnels (to expose the applications to the internet):

```bash
./start.sh 1
```

## Backend

- Navigate to the `backend` directory:

```bash
cd backend
```

- Build the backend:

```bash
mvn clean install -DskipTests
```

- Start the Confluence application:

```bash
cd confluence-app
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Frontend

- Navigate to the `frontend` directory:

```bash
cd frontend
```

- Use the correct Node.js version:

```bash
nvm use
```

- Install the dependencies:

```bash
npm install
```

- Start the Confluence application:

```bash
npm run start:confluence-app
```

## Stop

- Stop the Docker containers:

```bash
docker-compose -f docker-compose.dev.yml down
```

- Stop the SSH tunnels.

- Stop the backend and frontend applications.
