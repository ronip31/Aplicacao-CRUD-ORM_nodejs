import Veiculo from '../../models/Veiculo.js';

export const updateVeiculoByPlaca = async (req, res) => {
    const { placa_veiculo } = req.params;

    try {
        const [updatedRows] = await Veiculo.update(req.body, {
            where: { placa_veiculo },
        });

        if (updatedRows > 0) {
            res.json({ message: 'Veículo atualizado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Veículo não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar veículo:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
