import express from 'express';
import path from'path';
import { fileURLToPath } from 'url';
import proprietarioRouter from './proprietarioRouter.js';
import veiculoRouter from './veiculoRouter.js';
import associacaoRouter from './associacaoRouter.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Rota padrão
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

// Rotas específicas
app.use('/api', proprietarioRouter);
app.use('/api', veiculoRouter);
app.use('/api', associacaoRouter);



app.get('/cadastroproprietario', (req, res) => {
    console.log("Página /cadastroproprietario acessada");
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','proprietario.html'));
});


app.get('/cadastroveiculo', (req, res) => {
    console.log("Página /cadastroveiculo acessada");
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','veiculo.html'));
});

app.get('/createassociacao', (req, res) => {
    console.log("Página /createassociacao acessada");
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','associacao.html'));
});

app.get('/associados', (req, res) => {
    console.log("Página /associados acessada");
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','associados.html'));
});

app.get('/exclusaoVeiculo', (req, res) => {
    console.log("Página /exclusaoVeiculo acessada");
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    res.sendFile(path.join(currentDir, '..', 'public','exclusaoVeiculo.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});



