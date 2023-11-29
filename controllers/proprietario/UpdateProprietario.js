import Proprietario from '../../models/Proprietario.js';

export const updateProprietarioByCPF = async (req, res) => {
    const { cpf } = req.params;

    try {
        const [updatedRows] = await Proprietario.update(req.body, {
            where: { cpf },
        });

        if (updatedRows > 0) {
            res.json({ message: 'Proprietário atualizado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Proprietário não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar proprietário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
