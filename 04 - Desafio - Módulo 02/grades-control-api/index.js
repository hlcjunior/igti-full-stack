import express from 'express';
import { promises as fs } from 'fs';
import { db, port } from './configs.js';
import logger from './helpers/logger.js';

import gradesRouter from './routes/grades.js';

const { readFile } = fs;

const app = express();
app.use(express.json());

app.listen(port, async () => {
    try {
        await connectDB();
        startApi();
    } catch (error) {
        logger.error(error);
    }
});

const connectDB = async () => {
    try {
        await readFile(db);
    } catch (error) {
        throw new Error(
            `O arquivo "${db}" não existe, seu banco de dados está corrompido :(`
        );
    }
};

const startApi = () => {
    logger.info('Api Started!');
    app.use('/grades', gradesRouter);
};
