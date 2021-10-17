const   
    express = require('express'),
    bodyParser = require('body-parser'),
    cluster = require('cluster'),
    cpus = require('os').cpus().length,
    UltimateAiError = require('./util/ultimate-error'),
    router = require("./app");

require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const startServer = () => {
    const app = express();
    const port = 3000;
    app.use(bodyParser.json());
    // Connect to the database
    mongoose.connect(process.env.MONGO_DB).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        throw new UltimateAiError(400, `Unable to connect to MongoDB Database.`, err);
    })

    process.on('uncaughtException', (err) => {
        throw new UltimateAiError(400, `Uncaught Exception`, err);
    });

    process.on('unhandledRejection', (err) => {
        throw new UltimateAiError(400, `Unhandled Rejection`, err);
    });
    /**
     * Starting express app
     */
    app.use("/api", router);
    app.listen(port);
};

const startSingleNode = () => {
    startServer();
};

const startInClusterMode = () => {
    if (cluster.isMaster) {
        console.log(`Master cluster setting up ${cpus} workers...`);
        for (let i = 0; i < cpus; i += 1) {
            cluster.fork();
        }
        cluster.on('online', (worker) => {
            console.log(`Worker ${worker.process.pid} is online`);
        });
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
            console.log('Starting a new worker');
            cluster.fork();
        });
    } else {
        startSingleNode();
    }
};

startInClusterMode();


