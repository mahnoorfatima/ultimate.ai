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

 