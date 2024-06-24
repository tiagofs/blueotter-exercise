## Description

This is a Nest.js = PostgreSQL solution to interact with GitHub users' data.

## Running the app
Build and run the docker containers and the API will be available on port 3000.
```bash
$ docker-compose up --build
```

POST http://localhost:3000/users/{user}/repos/import

Copies all public repositories of {user} to the database.

GET http://localhost:3000/users/{user}/repos?search=

Lists all repositories of a {user} that are in the database.
You can also use the "search" query param to filter results. 
