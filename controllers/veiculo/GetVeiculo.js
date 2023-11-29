import Veiculo from '../../models/Veiculo.js';

export const getVeiculoByPlaca = async (req, res) => {
    const { placa_veiculo } = req.params;

    try {
        const veiculo = await Veiculo.findByPk(placa_veiculo);
        if (veiculo) {
            res.json(veiculo);
        } else {
            res.status(404).json({ message: 'Veículo não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar veículo:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const getAllVeiculos = async (req, res) => {
    try {
        const veiculos = await Veiculo.findAll();

        res.json(veiculos);

    } catch (error) {
        console.error('Erro ao buscar veículos:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

