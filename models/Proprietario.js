// Proprietario.js
import { sequelize } from "../config/db.js";
import Veiculo from "./Veiculo.js";

const Proprietario = sequelize.define('Proprietario', {
    cpf: {
        type: sequelize.Sequelize.STRING(11),
        primaryKey: true
    },
    nome: {
        type: sequelize.Sequelize.STRING(255),
        allowNull: false
    },
    fone: {
        type: sequelize.Sequelize.STRING(15),
        allowNull: false
    },
}, {  
    timestamps: false,
    freezeTableName: true 
});


export default Proprietario;
