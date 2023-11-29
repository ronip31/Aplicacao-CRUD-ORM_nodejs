import Proprietario from '../../models/Proprietario.js';


export const getProprietarioByCPF = async (req, res) => {
    const { cpf } = req.params;

    try {
        const proprietario = await Proprietario.findByPk(cpf);
        if (proprietario) {
            res.json(proprietario);
        } else {
            res.status(404).json({ message: 'Proprietário não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar proprietário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const getAllProprietarios = async (req, res) => {
    try {
        const proprietarios = await Proprietario.findAll();
        res.json(proprietarios);
    } catch (error) {
        console.error('Erro ao buscar todos os proprietários:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};