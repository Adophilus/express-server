import * as dotenv from 'dotenv';
import Server from './server.js';
dotenv.config();
function sleep(time) {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {
        ;
    }
}
sleep(30 * 1000);
const server = new Server();
server.start();
