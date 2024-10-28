# Resize issue

## Suspected bug: 
In the RequirementsPage.tsx file, the AP.resize() causes the iframe to be resized to an incorrect height. Subsequent calls to AP.resize() do not appear to reset the height to the full size of the container page.

## Steps to reproduce:
### Build the project and run the app.

- Setup a domain name for your app, and specify the domain in the .env file.  
- Build the backend

```bash
cd backend
mvn clean install -DskipTests
```

- Build the frontend

```bash
cd frontend
npm install
npm run build
```

- Build the docker containers:
The issue is not reproducible in dev mode

```bash
docker-compose -f docker-compose.local.yml build 
docker-compose -f docker-compose.local.yml up 
```

- Install the app in Confluence, and create a private listing token.

- Navigate to the Requirement Yogi entry page, and refresh until you see the height not properly set.


