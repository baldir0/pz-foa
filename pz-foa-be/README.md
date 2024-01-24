# Food order app backend

FOA-API - Food order application API, is a backend part of FOA application. It's used to transfer data between user and database.

## Prerequires

- Node.js >= v20.11.0
- yarn/npm
- MySQL database

## Instalation / building project

Run `npm i` in your command prompt to install all dependencies.

Make a copy of ".env-example" file and rename it to ".env". This is a configuration file, used to configure params of application:

- APP_PORT - port used to communicate with application
- APP_HOSTNAME - hostname of application
- DB_HOSTNAME - hostname of database server
- DB_PORT - port number used to communicate with database
- DB_USERNAME - database username used to connect with database
- DB_PASSWORD - database password used to connect with database
- DB_SCHEMA - database schema used by appliaction
- DB_SYNCHRONIZE - Takes 0 or 1. Setup it to 1 at first run if you need to create and configure tables in selected schema, otherwise set it to 0.
- AUTH_SECRET - secret array of chars used to crypt session token, it should be a long string of random characters. Don't shere this key with others.
- AUTH_EXPIRATIONTIME - time after session cookie will expire

To run appliaction in development mode / without building use `npm run start`, to run start script.

If you want to build application, you can use `npm run build`. It will create a new folder called "dist", you will need to move your ".evn" file there.
To run application use `node index.js` in dist folder.

# Appliaction Endpoints

Bellow you will find a list of endpoints, avaliable in API.

- [Auth](##Auth)
  - [Login](###Login) - Login user to appliaction
  - [Logout](###Logout) - Logout user from application
  - [Register](###Register) - Register new user to appliaction
- [Profile](##Profile)
- [Product](##Product)
- [Order](##Order)

## Auth

Endpoint used for user authorization.

### Login

- Usage: `POST /auth/login`
- Body:

```json
  {
    "email": "user-email-address", # Only one of email
    "login": "user-login", # or login is required
    "passwordHSW": "user-password",
  }
```

- Result [Success]:

```json
{
  "user": UserObject,
  "message": "response message"
}
```

- Result [Failed]:

```json
{
  "error": "error message"
}
```

### Logout

- Usage: `GET /auth/logout`
- Body: none
- Result [Success]:

```json
{
  "data": "user logout message"
}
```

- Result [Failed]:

```json
{
  "error": "error message"
}
```

### Register

- Usage: `POST /auth/register`
- Body:

```json
{
  "login": "user login",
  "email": "user email",
  "passwordHSW": "user password"
}
```

- Result [Success]:

```json
{
  "data": "user register message"
}
```

- Result [Failed]:

```json
{
  "error": "error message"
}
```

## Product

## Order

## Profile
