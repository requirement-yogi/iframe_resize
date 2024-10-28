# Run the entire project

## Setup

- Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

- Update the environment variables:

```bash
nano .env
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

- Build the frontend:

```bash
npm run build
```

## Start

- Start the entire project using Docker containers (using the local stack):

```bash
docker-compose -f docker-compose.local.yml up
```

> **Note:**
> You can use the `-d` option to run containers in the background.

> **Note:**
> You can use the `--build` option to force container images to be rebuilt.

- Start the SSH tunnels (to expose the applications to the internet):

```bash
./start.sh 1
```

## Stop

- Stop the Docker containers:

```bash
docker-compose -f docker-compose.local.yml down
```

- Stop the SSH tunnels.
