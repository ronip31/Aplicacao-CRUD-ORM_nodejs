import ProprietarioVeiculo from '../../models/ProprietarioVeiculo.js';


// Importe seus modelos e o sequelize aqui
export const deleteAssociado = async (req, res) => {
    try {
        const { cpfProprietario, placaVeiculo } = req.params;
        console.log("cpfProprietario, placaVeiculo ",cpfProprietario, placaVeiculo  )
        // Encontre o registro associado no banco de dados
        const associacao = await ProprietarioVeiculo.findOne({
            where: { cpf_proprietario: cpfProprietario, placa_veiculo: placaVeiculo }
        });

        // Se não encontrar, retorne um erro
        if (!associacao) {
            return res.status(404).json({ error: 'Associação não encontrada' });
        }

        // Remova o registro do banco de dados
        await associacao.destroy();

        // Responda com sucesso
        res.json({ message: 'Veículo desassociado com sucesso' });
    } catch (error) {
        console.error('Erro ao desassociar veículo:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
