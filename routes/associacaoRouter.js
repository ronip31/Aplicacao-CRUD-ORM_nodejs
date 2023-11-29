import express from 'express';

import { associarVeiculoProprietario, getVeiculosAssociados  } 

from '../controllers/associacao/associacaoController.js';

const router = express.Router();

router.post('/associacao', associarVeiculoProprietario);

// Adicione a rota para obter os veículos associados a um proprietário
router.get('/associados/:cpfProprietario', getVeiculosAssociados);

export default router;