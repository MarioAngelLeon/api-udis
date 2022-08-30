import 'dotenv/config';
import Server from './server/server';

const server  = new Server();

server.run();