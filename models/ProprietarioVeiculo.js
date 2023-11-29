import { sequelize } from "../config/db.js";
import Proprietario from "./Proprietario.js";
import Veiculo from "./Veiculo.js";

const ProprietarioVeiculo = sequelize.define('ProprietarioVeiculo', {
    cpf_proprietario: {
        type: sequelize.Sequelize.STRING(11),
        primaryKey: true,
        references: {
            model: Proprietario,
            key: 'cpf'
        }
    },
    placa_veiculo: {
        type: sequelize.Sequelize.STRING(10),
        primaryKey: true,
        references: {
            model: Veiculo,
            key: 'placa_veiculo'
        }
    },
}, {
    timestamps: false,
    freezeTableName: true
});

ProprietarioVeiculo.belongsTo(Proprietario, { foreignKey: 'cpf_proprietario' });
ProprietarioVeiculo.belongsTo(Veiculo, { foreignKey: 'placa_veiculo' });

export default ProprietarioVeiculo;