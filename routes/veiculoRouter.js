import express from 'express';

import { createVeiculo}
 from '../controllers/veiculo/createVeiculo.js';

import { deleteVeiculoByPlaca}
 from '../controllers/veiculo/DeleteVeiculo.js';

import { getVeiculoByPlaca, getAllVeiculos}
 from '../controllers/veiculo/GetVeiculo.js';

import { updateVeiculoByPlaca}
 from '../controllers/veiculo/UpdateVeiculo.js';
 

const router = express.Router();

// Rota para criar um novo veículo
router.post('/createveiculos', createVeiculo);

//busca veiculos
router.get('/veiculos', getAllVeiculos);

// Rota para obter um veículo por placa
router.get('/veiculos/:placa_veiculo', getVeiculoByPlaca);

// Rota para atualizar um veículo por placa
router.put('/veiculos/:placa_veiculo', updateVeiculoByPlaca);

// Rota para deletar um veículo por placa
router.delete('/deleteveiculos/:placa_veiculo', deleteVeiculoByPlaca);

export default router;
