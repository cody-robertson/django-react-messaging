[![License: MIT](https://img.shields.io/github/license/vintasoftware/django-react-boilerplate.svg)](LICENSE.txt)

# Django React Messaging

## About
A demo app written using Django, React, and PostgreSQL featuring basic chat functionality.

This project was created from [Vinta Software's Django-React-Boilerplate](https://github.com/vintasoftware/django-react-boilerplate).
## Running

### Setup with Docker:
- Open a new command line window and go to the project's directory.
- Create the migrations for our apps:  
  `make docker_makemigrations`
- Run the migrations:
  `make docker_migrate`
- Run the project:
  `make docker_up`
- Access `http://localhost:8000` on your browser and the project should be running there
  - When you run `make docker_up`, some containers are spinned up (frontend, backend, database, etc) and each one will be running on a different port
  - The container with the React app uses port 3000. However, if you try accessing it on your browser, the app won't appear there and you'll probably see a blank page with the "Cannot GET /" error
  - This happens because the container responsible for displaying the whole application is the Django app one (running on port 8000). The frontend container is responsible for providing a bundle with its assets for [django-webpack-loader](https://github.com/django-webpack/django-webpack-loader) to consume and render them on a Django template
- To access the logs for each service, run:
  `make docker_logs <service name>` (either `backend`, `frontend`, etc)
- To stop the project, run:
  `make docker_down`

## Testing

### Django
`make test` 

Will run django tests using `--keepdb` and `--parallel`. You may pass a path to the desired test module in the make command. E.g.:

`make test someapp.tests.test_views`

### Postman
A postman collection for hitting our 3 endpoints with GET and POST verbs is included in the /postman directory of this repo. These include extremely basic tests verify status codes.

### React
`npm install && npm test` will execute jest unit tests for our React application.

[MIT License](LICENSE.txt)
