import express from 'express';
import { promises as fs } from 'fs';
import { db } from '../configs.js';
import logger from '../helpers/logger.js';

const { readFile, writeFile } = fs;

const router = express.Router();

/** Add Grade */
router.post('/', async (req, res, next) => {
    try {
        const { student, subject, type, value } = req.body;

        const data = JSON.parse(await readFile(db));

        const newGrade = {
            id: data.nextId++,
            student: student || 'Não Informado',
            subject: subject || 'Não Informado',
            type: type || 'Não Informado',
            value: value || 0.0,
            timestamp: new Date(),
        };

        data.grades.push(newGrade);

        await writeFile(db, JSON.stringify(data));

        logger.info(
            `${req.method} ${req.originalUrl} ${JSON.stringify(newGrade)}`
        );

        res.send(newGrade);
    } catch (error) {
        next(error);
    }
});

/** Update grade */
router.patch('/', async (req, res, next) => {
    try {
        const { id, student, subject, type, value } = req.body;

        const data = JSON.parse(await readFile(db));

        const grade = data.grades.find((grade) => grade.id === id);

        if (!grade) {
            throw {
                status: 404,
                message: `Nenhuma nota encontrada com o ID: ${id}`,
            };
        }

        grade.student = student || grade.student;
        grade.subject = subject || grade.subject;
        grade.type = type || grade.type;
        grade.value = value || grade.value;

        await writeFile(db, JSON.stringify(data));

        logger.info(
            `${req.method} ${req.originalUrl} ${JSON.stringify(grade)}`
        );

        res.send(grade);
    } catch (error) {
        next(error);
    }
});

/** Delete grade */
router.delete('/:id', async (req, res, next) => {
    try {
        const idParam = parseInt(req.params.id);

        const data = JSON.parse(await readFile(db));

        data.grades = data.grades.filter(({ id }) => id !== idParam);

        logger.info(`${req.method} ${req.originalUrl}`);

        await writeFile(db, JSON.stringify(data));

        res.end();
    } catch (error) {
        next(error);
    }
});

/** Find grade by id */
router.get('/find/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const data = JSON.parse(await readFile(db));

        const grade = data.grades.find((grade) => grade.id === id);

        if (!grade) {
            throw {
                status: 404,
                message: `Nenhuma nota encontrada com o ID: ${id}`,
            };
        }

        res.send(grade);
    } catch (error) {
        next(error);
    }
});

/** Get total grade value, filtering by student and subject */
router.get('/total', async (req, res, next) => {
    try {
        const { student, subject } = req.query;

        let data = JSON.parse(await readFile(db));

        const total = data.grades
            .filter(
                (grade) =>
                    grade.student === student && grade.subject === subject
            )
            .reduce((accumulator, { value }) => {
                return accumulator + value;
            }, 0);

        res.send({ total: total });
    } catch (error) {
        next(error);
    }
});

/** Get average grade value, filtering by subject and type */
router.get('/average/:subject/:type', async (req, res, next) => {
    try {
        const { subject, type } = req.params;

        let data = JSON.parse(await readFile(db));

        const grades = data.grades.filter(
            (grade) => grade.subject === subject && grade.type === type
        );

        const total = grades.reduce((accumulator, { value }) => {
            return accumulator + value;
        }, 0);

        const average = total / grades.length || 0;

        res.send({ average: average });
    } catch (error) {
        next(error);
    }
});

/** Get top 3 complete grade, filtering by subject and type  */
router.get('/top3', async (req, res, next) => {
    try {
        const { subject, type } = req.body;

        let data = JSON.parse(await readFile(db));

        const grades = data.grades
            .filter((grade) => grade.subject === subject && grade.type === type)
            .sort((a, b) => {
                return b.value - a.value;
            })
            .slice(0, 3);

        res.send(grades);
    } catch (error) {
        next(error);
    }
});

/** Get all students grades */
router.get('/', async (_, res, next) => {
    try {
        const data = JSON.parse(await readFile(db));

        delete data.nextId;

        res.send(data);
    } catch (error) {
        next(error);
    }
});

router.use((error, req, res, _) => {
    let params = JSON.stringify(req.params);
    let query = JSON.stringify(req.query);
    let body = JSON.stringify(req.body);

    params = params !== '{}' ? ` PARAMS [${params}]` : '';
    query = query !== '{}' ? ` QUERY [${query}]` : '';
    body = body !== '{}' ? ` BODY [${body}]` : '';

    if (error.status === 404) {
        logger.warn(
            `${req.method} ${req.originalUrl} - ${error.message}${params}${query}${body}`
        );
    } else {
        logger.error(
            `${req.method} ${req.originalUrl} - ${error.message}${params}${query}${body}`
        );
    }

    res.status(error.status || 400).send({
        error: error.message,
    });
});

export default router;
