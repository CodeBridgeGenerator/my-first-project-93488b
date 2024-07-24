# ExpressJS [CodeBridge]

>

## About

CodeBridge generated backend project.  
This project code uses [Feathers v4](https://crow.docs.feathersjs.com/). A lightweight web-framework for creating real-time applications and REST APIs using JavaScript or TypeScript.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. We recommend node v16 and above.
2. Install your dependencies

    ```
    cd path/to/project
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

    or with [nodemon](https://www.npmjs.com/package/nodemon) script monitoring tool

    ```
    npm run dev
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Help

For more information about CodeBridge visit our [website](https://codebridge.my/).  
For more information on all the things you can do with Feathers visit the [Feathers Docs](https://crow.docs.feathersjs.com/api/).

## Running on with PM2

pm2 status
pm2 restart ecosystem.config.js --env production
pm2 restart ecosystem.config.js --env stg
