import winston from 'winston';
import { logLevel, apiName } from '../configs.js';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: logLevel,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log/grades-api.log' }),
    ],
    format: combine(
        label({ label: apiName }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSZZ' }),
        myFormat
    ),
});

export default logger;
