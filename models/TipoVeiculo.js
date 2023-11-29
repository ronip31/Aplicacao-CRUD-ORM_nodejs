import { sequelize } from "../config/db.js";

const TipoVeiculo = sequelize.define('TipoVeiculo', {
    id_tipo: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true, // Defina isso para indicar que é a chave primária
        autoIncrement: true, // Se a coluna for autoincrementável
        allowNull: false
    },
    descricao: {
        type: sequelize.Sequelize.STRING(255),
        allowNull: false
    },
}, {  
    timestamps: false,
    freezeTableName: true 
});

export default TipoVeiculo;

