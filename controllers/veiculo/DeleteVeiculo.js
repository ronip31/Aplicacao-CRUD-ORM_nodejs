import Veiculo from '../../models/Veiculo.js';
import ProprietarioVeiculo from '../../models/ProprietarioVeiculo.js';

export const deleteVeiculoByPlaca = async (req, res) => {
    const { placa_veiculo } = req.params;

    try {
        // Verificar se o veículo está associado a um proprietário
        const isVeiculoAssociated = await ProprietarioVeiculo.findOne({
            where: { placa_veiculo },
        });

        if (isVeiculoAssociated) {
            // Se estiver associado, não permitir a exclusão
            res.status(400).json({ message: 'O veículo está associado a um proprietário. Desassocie primeiro.' });
            return;
        }

        // Se não estiver associado, continuar com a exclusão do veículo
        const deletedRowCount = await Veiculo.destroy({
            where: { placa_veiculo },
        });

        if (deletedRowCount > 0) {
            res.json({ message: 'Veículo deletado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Veículo não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao deletar veículo:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
