import Proprietario from '../../models/Proprietario.js';

export const deleteProprietarioByCPF = async (req, res) => {
    const { cpf } = req.params;

    try {
        const deletedRowCount = await Proprietario.destroy({
            where: { cpf },
        });

        if (deletedRowCount > 0) {
            res.json({ message: 'Proprietário deletado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Proprietário não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao deletar proprietário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
