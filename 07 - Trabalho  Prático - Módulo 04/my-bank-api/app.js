import express from 'express';
import mongoose from 'mongoose';

import { accountRouter } from './routes/accountRouter.js';

const connect = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://hudson:hudson-igti@cluster0.4gnnr.mongodb.net/my-bank?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            }
        );
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.log(`Erro ao conectar no MongoDB: ${error}`);
    }
};

const app = express();
app.use(express.json());
app.use(accountRouter);

app.listen(3000, () => console.log('API Iniciada'));
connect();
