import { App } from './app';

let server = new App();
server.init();
server.initRoutes();
server.connectDb();
server.start();