// createVeiculo.js
import Veiculo from '../../models/Veiculo.js';
import TipoVeiculo from '../../models/TipoVeiculo.js';

export const createVeiculo = async (req, res) => {
    try {
        const { placa, modelo, preco } = req.body;
        console.log("placa, modelo, preco", placa, modelo, preco)

        let tipoVeiculoId;
        if (preco >= 50000 && preco < 100000) {
            tipoVeiculoId = 2; // Luxo
        } else if (preco < 50000) {
            tipoVeiculoId = 1; // Popular
        } else {
            tipoVeiculoId = 3; // Super Luxo
        }

        const novoVeiculo = await Veiculo.create({
            placa_veiculo: placa ,
            modelo_veiculo: modelo,
            preco_veiculo: preco,
            tipo_veiculo_id: tipoVeiculoId,
        });

        const tipoVeiculo = await TipoVeiculo.findOne({
            where: { id_tipo: tipoVeiculoId },
            attributes: ['id_tipo', 'descricao'],
        });

        res.json({
            message: 'Um novo veículo foi cadastrado com sucesso.',
            data: { ...novoVeiculo.toJSON(), tipoVeiculo },
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Já existe um veículo com essa placa.' });
        } else {
            console.error('Erro ao cadastrar um novo veículo:', error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
};
