# Web server that exposes a single endpoint. This endpoint accepts a bot identifier and a visitor written message. It returns a single reply. 

## Requirements

* [Mongo db server up ad running] 
* [node package manager]

## How to run

1. Install dependencies
   ```bash
   npm install
   ```
1. Create collection in mongo   
    ```bash
    ai-intents
    ```
1. Import JSON data in mongo

1. Update .env file with following
    ```bash
      ULTIMATE_API_KEY, ULTIMATE_API_VALUE, MONGO_DB uri
    ```
1. Start the service   
    ```bash
    npm start
    ```
1. Please see the responseApi.yml file to make request to the server
1. To check the health of app 
    ```bash
      localhost:3000/check
    ```  

## Description 

- [x] src
    - [x] database 
        - [x] contains scheme for collection ai-intents. I use mongo db to match with the stack of ultimate.ai. The collection is exactly the same as JSON provided with challenge.
        - [x] Mongoose ODM to provide straightforward and schema-based solution to model application
    - [x] service
        - [x] Api service to read from ultimate.ai endpont.
        - [x] Bot Convesartion to handle the entire process from reading api to getting response from database
    - [x] util
        - [x] http-util to read from api. Here we could have used express but I prefered to use Request to keep my code organized.
        - [x] ultimate-error is a class to handle errors in the entire application. In future, this class can be extended to a package and beign used globally in the app as a Logger.
        - [x] validator is a module to validate the data. I have used very simple code but idea behind this is it can be a concrete validator for the entire app.
    - [x] app is an express router
- [x] Build pipeline (CI/CD) to deploy on heroku
- [x] ResponseApi.yml 

## Improvements
If i had more time, i'd also have implemented

- [x] query based graphql call to api
- [x] Deploy the working solution on any serverless or Heroku
- [x] Code quality improvement (moving to Typescript) and More error handling