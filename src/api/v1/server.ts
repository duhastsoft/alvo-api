import env from 'dotenv';
env.config();
import http from 'http';
import app from './app';

const port = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on ${ port }`));

export default server;

