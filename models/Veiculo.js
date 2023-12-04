import { sequelize } from "../config/db.js";
import TipoVeiculo from "./TipoVeiculo.js";


const Veiculo = sequelize.define('Veiculo', {
    placa_veiculo: {
        type: sequelize.Sequelize.STRING(10),
        primaryKey: true
    },
    modelo_veiculo: {
        type: sequelize.Sequelize.STRING(255),
        allowNull: false
    },
    preco_veiculo: {
        type: sequelize.Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    tipo_veiculo_id: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: TipoVeiculo,
            key: 'id_tipo'
        }
    },
}, {  
    timestamps: false,
    freezeTableName: true 
});

Veiculo.belongsTo(TipoVeiculo, { foreignKey: 'tipo_veiculo_id' });

export default Veiculo;
