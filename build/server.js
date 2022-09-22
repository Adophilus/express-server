import { Server } from '@overnightjs/core';
import { NOT_FOUND, ReasonPhrases } from 'http-status-codes';
import { readdir } from 'fs/promises';
import { Logger } from 'tslog';
import path from 'path';
const APPS_PATH = 'apps';
export default class extends Server {
    logger = new Logger({ name: 'MainServer' });
    constructor() {
        super();
        this.loadApps().then(() => {
            this.defineRoutes();
        }).catch((err) => {
            this.logger.warn(err);
            this.logger.warn('Failed to load apps!');
        });
    }
    defineRoutes() {
        this.app.use((req, res) => {
            res.status(NOT_FOUND).send({
                error: ReasonPhrases.NOT_FOUND,
                path: req.url
            });
        });
    }
    async loadApps() {
        const files = await readdir(APPS_PATH);
        for (const file of files) {
            this.logger.info(`Loading app: '${file}'`);
            const _module = await import(`../${path.join(APPS_PATH, file)}`);
            this.app.use(`/${file}`, _module.app);
        }
    }
    start(port = parseInt(process.env.PORT ?? '8000'), host = process.env.HOST ?? '0.0.0.0') {
        this.app.listen(port, host, () => {
            this.logger.info('Started app...');
        });
    }
}
