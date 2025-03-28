const cluster = require('cluster');
const os = require('os');
const express = require('express');
const { log } = require('console');

const totalCPUs = os.cpus().length;

console.log(totalCPUs, "Total CPU`");

if (cluster.isPrimary) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
} else {
    const app = express();
    app.get('/', (req, res) => {
        res.json(`Hello from worker ${process.pid}`);
    });

    app.listen(3000, () => {
        console.log(`Listening on port 3000, work`);
    });
}