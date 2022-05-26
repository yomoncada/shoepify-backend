require('dotenv').config()
const os = require('os');
const cluster = require('cluster');
/* const minimist = require('minimist'); */

const server = require('./utils/server.utils');

/* const args = minimist(process.argv.slice(2), {
    default: {
      PORT: 8080,
      MODE: 'FORK'
    },
    alias: {
      p: 'PORT',
      m: 'MODE'
    }
}); */

const args = {
  PORT: process.env.PORT || 8080,
  MODE: process.env.MODE || 'FORK'
};

const numCPUs = os.cpus().length;

if (args.MODE == 'CLUSTER') {
  console.log(`${numCPUs} processes was taken by node.`);
  
  if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    console.log(`Worker ${process.pid} started`);

    server.init(args);
  }
} else {
  console.log(`1 process was taken by node.`);
  console.log(`Process ${process.pid} is running`);

  server.init(args);
}