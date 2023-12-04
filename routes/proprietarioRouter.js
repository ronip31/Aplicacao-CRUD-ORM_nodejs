import express from 'express';



import { createProprietario }
 from '../controllers/proprietario/CreateProprietario.js';

import { getProprietarioByCPF, getAllProprietarios}
 from '../controllers/proprietario/GetProprietario.js';

import {  updateProprietarioByCPF }
 from '../controllers/proprietario/UpdateProprietario.js';

import { deleteProprietarioByCPF }
 from '../controllers/proprietario/DeleteProprietario.js';
 

const router = express.Router();

// Rota para criar um novo proprietário
router.post('/createproprietarios', createProprietario);

router.get('/proprietarios', getAllProprietarios);

// Rota para obter um proprietário por CPF
router.get('/proprietarios/:cpf', getProprietarioByCPF);

// Rota para atualizar um proprietário por CPF
//router.put('/proprietarios/:cpf', updateProprietarioByCPF);

// Rota para deletar um proprietário por CPF
//router.delete('/proprietarios/:cpf', deleteProprietarioByCPF);

export default router;
