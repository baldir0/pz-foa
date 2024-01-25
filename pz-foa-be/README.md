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

- [Auth](#Auth)
  - [Login](#Login) - Login user to appliaction
  - [Logout](#Logout) - Logout user from application
  - [Register](#Register) - Register new user to appliaction
- [Product](#Product)
  - [Get List](#Product-List) - Get list of products
  - [Get Single](#Single-product) - Get details of given product
  - [Update Product](#Update-product) - Updates given product with passed data
  - [Add Product](#Add-Product) - Add new product with passed params
  - [Delete Product](#Delete-Product) - Deletes given product
- [Order](#Order)
  - [Update Order Position](#Update-order-position) - update single position in order
  - [Delete Order Position](#Delete-order-position) - delete single position from order
  - [Add Order Position](#Add-order-position) - add single position to order
  - [Get Order list](#Order-List) - Get list of user orders
  - [Get Order list - all](#List-all-orders) - Gel list of all application orders
  - [Get Single](#Single-order) - Get single order details
  - [Get Update](#Update-order) - Updates order with passed data
  - [Get Delete](#Delete-order) - Delete given order.
  - [Get Craete Order](#Create-order) - Create new order

## Auth

Endpoint used for user authorization.

### Login

Login user to appliaction, creates JWT cookie used to authorization.

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

Logout user from application, clears client JWT cookie.

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

Creates new user, used to login.

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

### Product list

Get list of all products.

- Usage: `GET /product/list`
- Body: none
- Result [Success]:
  ```json
  {
    [
      products[],
      itemCount
    ]
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: USER

### Single Product

Get single product details

- Usage: `GET /product/:id`
- Body: none
- Result [Success]:
  ```json
  {
    "product": SingleProduct
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: USER

### Update Product

Update given product

- Usage: `PATCH /product/:id`
- Body:
  ```json
  {
    "name": "Product name",
    "description": "Product description",
    "price": "Product price",
    "avalaibleStocks": "Amount of item"
  }
  ```
- Result [Success]:
  ```json
  {
    "message": "Product {product-id} updated!",
    "newData": {
      "name": "Product name",
      "description": "Product description",
      "price": "Product price",
      "avalaibleStocks": "Amount of item"
    }
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: ADMINISTRATOR

### Add Product

Add new product to application

- Usage: `POST /product/`
- Body:
  ```json
  {
    "name": "Product name",
    "description": "Product description",
    "price": "Product price",
    "avalaibleStocks": "Start amount of item"
  }
  ```
- Result [Success]:
  ```json
  {
    "message": "Product created!",
    "productId": "Id of created product"
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: ADMINISTRATOR

### Delete Product

Delete product from application

- Usage: `DELETE /product/:id`
- Body: none
- Result [Success]:
  ```json
  {
    "message": "Product {product-id} deleted!"
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: ADMINISTRATOR

## Order

### Single order

Get single order

- Usage: `GET /order/:id`
- Body: none
- Result [Success]:
  ```json
  {
    "order": Order,
    "positions": Product[]
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: USER

### Order List

Get list of user orders

- Usage: `GET /order/list`
- Body: none
- Result [Success]:
  ```json
  {
    Order[]
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: USER

### List all orders

Get list of all orders in system

- Usage: `GET /order/list-all`
- Body: none
- Result [Success]:
  ```json
  {
    Order[]
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: ADMINISTRATOR

### Update order

Update single order data.

- Usage: `PATCH /order/:id`
- Body: none
- Result [Success]:
  ```json
  {
    UpdateResult
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: ADMINISTRATOR

### Delete order

Delete single order

- Usage: `DELETE /order/:id`
- Body: none
- Result [Success]:
  ```json
  {
    DeleteResult
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: ADMINISTRATOR

### Create order

Creates new order

- Usage: `PUT /order/:id`
- Body: none
- Result [Success]:
  ```json
  {
    InsertResult
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: USER

### Add order position

Add product to order

- Usage: `PUT /order/:orderId/position`
- Body:

  ```json
  {
    "productId": "id of added product",
    "amount": "amount of product"
  }
  ```

- Result [Success]:
  ```json
  {
    InsertResult
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: ADMINISTRATOR

### Update order position

Update single position of the order

- Usage: `PATCH /order/:orderId/position/:positionId`
- Body:

  ```json
  {
    "productId": "new product id",
    "amount": "new product amount"
  }
  ```

- Result [Success]:
  ```json
  {
    UpdateResult
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: ADMINISTRATOR

### Delete order position

Delete single position of the order

- Usage: `DELETE /order/:orderId/position/:positionId`
- Body: none
- Result [Success]:
  ```json
  {
    DeleteResult
  }
  ```
- Result [Failed]:
  ```json
  {
    "error": "error message"
  }
  ```
- Required privilages: ADMINISTRATOR