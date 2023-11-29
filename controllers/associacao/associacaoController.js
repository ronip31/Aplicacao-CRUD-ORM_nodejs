import ProprietarioVeiculo from '../../models/ProprietarioVeiculo.js';
import Veiculo from '../../models/Veiculo.js';
import TipoVeiculo from '../../models/TipoVeiculo.js';


export const associarVeiculoProprietario = async (req, res) => {
    try {
        const { cpfProprietario, placaVeiculo } = req.body;

        // Verificar se o veículo já possui um proprietário
        const veiculoAssociado = await ProprietarioVeiculo.findOne({
            where: {
                placa_veiculo: placaVeiculo,
            },
        });

        if (veiculoAssociado && veiculoAssociado.cpf_proprietario !== cpfProprietario) {
            // Se o veículo já possui um proprietário diferente, retornar uma mensagem indicando isso
            return res.status(400).json({ error: 'Veículo já associado a outro proprietário.' });
        }

        // Verificar se a associação já existe
        const associacaoExistente = await ProprietarioVeiculo.findOne({
            where: {
                cpf_proprietario: cpfProprietario,
                placa_veiculo: placaVeiculo,
            },
        });

        if (associacaoExistente) {
            // Se a associação já existe, retornar uma mensagem indicando isso
            return res.status(400).json({ error: 'Veículo já associado a este proprietário.' });
        }

        // Se a associação não existe e o veículo não possui proprietário diferente, criar a nova associação
        await ProprietarioVeiculo.create({
            cpf_proprietario: cpfProprietario,
            placa_veiculo: placaVeiculo,
        });

        res.json({ message: 'Veículo associado ao proprietário com sucesso.' });
    } catch (error) {
        console.error('Erro ao associar veículo ao proprietário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


export const getVeiculosAssociados = async (req, res) => {
    const { cpfProprietario } = req.params;

    try {
        const veiculosAssociados = await ProprietarioVeiculo.findAll({
            where: { cpf_proprietario: cpfProprietario },
            include: [
                {
                    model: Veiculo,
                },
            ],
        });

        if (veiculosAssociados.length > 0) {
            const veiculosFormatados = veiculosAssociados.map(item => {
                const veiculo = item.Veiculo;

                return {
                    placa_veiculo: veiculo.placa_veiculo,
                    modelo_veiculo: veiculo.modelo_veiculo,
                    preco_veiculo: veiculo.preco_veiculo,
                    tipo_veiculo_id: veiculo ? veiculo.tipo_veiculo_id : null,
                };
            });

            // Obtendo as descrições dos tipos de veículo
            for (const veiculo of veiculosFormatados) {
                if (veiculo.tipo_veiculo_id) {
                    const tipoVeiculo = await TipoVeiculo.findOne({
                        where: { id_tipo: veiculo.tipo_veiculo_id },
                    });

                    veiculo.descricao_tipo = tipoVeiculo ? tipoVeiculo.descricao : null;
                }
            }

            res.json(veiculosFormatados);
        } else {
            res.status(404).json({ message: 'Nenhum veículo associado encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar veículos associados:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
