import Proprietario from '../../models/Proprietario.js';

export const createProprietario = async (req, res) => {
    const { cpf, nome, fone } = req.body;

    try {
        // Cria o proprietário
        const novoProprietario = await Proprietario.create({ cpf, nome, fone });

        res.json({
            message: 'Um novo proprietário foi cadastrado com sucesso.',
            data: novoProprietario,
        });
    } catch (error) {
        console.error('Erro ao cadastrar um novo proprietário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

