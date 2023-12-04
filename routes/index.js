import express from 'express';
import path from'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import proprietarioRouter from './proprietarioRouter.js';
import veiculoRouter from './veiculoRouter.js';
import associacaoRouter from './associacaoRouter.js'
import loginRouter from './loginRouter.js';
import cors from 'cors';

let globalToken = null;
const secretKey =  'keysecret';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());


app.get('/', (req, res) => {
    console.log("Página /login acessada");

    res.redirect('/login');
});
app.use('/api', loginRouter);



app.get('/login', (req, res) => {
    console.log("Página /login acessada");
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','login.html'));
});


// Rotas específicas
app.use('/api', verifyJWT,proprietarioRouter);
app.use('/api',verifyJWT, veiculoRouter);
app.use('/api',verifyJWT, associacaoRouter);


app.post('/enviar-token', (req, res) => {
    const token = req.body;
    console.log('Token recebido no servidor:', token);

    globalToken = token;
    
    res.json({ message: 'Token recebido com sucesso' });
});


app.post('/remove-token', (req, res) => {
    const token = req.body;
    console.log('Token recebido no servidor:', token);

    globalToken = token;
    
    res.json({ message: 'Token recebido com sucesso' });
});


app.get('/cadastroproprietario',verifyJWT, async (req, res) => {
    console.log("Página /cadastroproprietario acessada");

    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','createproprietario.html'));
});


app.get('/cadastroveiculo',verifyJWT, (req, res, next) => {
    console.log("Página /cadastroveiculo acessada");
   
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','createveiculo.html'));
});

app.get('/createassociacao',verifyJWT, (req, res, next) => {
    console.log("Página /createassociacao acessada");
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','createassociacao.html'));
});

app.get('/associados',verifyJWT, (req, res) => {
    console.log("Página /associados acessada");
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','associados.html'));
});

app.get('/exclusaoVeiculo',verifyJWT, (req, res) => {
    console.log("Página /exclusaoVeiculo acessada");
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','exclusaoVeiculo.html'));
});

app.get('/desassociar', verifyJWT,(req, res) => {
    console.log("Página /desassociar acessada");
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','desassociar.html'));
});


export function verifyJWT(req, res, next) {
    const tokenObject = globalToken; 

    if (!tokenObject || !tokenObject.token) {
        return res.status(401).json({ auth: false, message: 'Não há token, vá para a página de login' });
    }

    const token = tokenObject.token.trim(); 

    console.log("Token em verifyJWT:", token);

    jwt.verify(token, secretKey, function(err, decoded) {
        if (err) {
            console.log("Erro com a autenticação do token:", err);
            return res.status(500).json({ auth: false, message: 'Erro com a Autenticação do Token' });
        }

        req.userId = decoded.id;
        next();
    });
}


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});



