import { sequelize } from "../config/db.js";

const Usuario = sequelize.define('Usuario', {
    id_user: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true, // Defina isso para indicar que é a chave primária
        autoIncrement: true, // Se a coluna for autoincrementável
        allowNull: false,
    },
    username: {
        type: sequelize.Sequelize.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize.Sequelize.STRING(255),
        allowNull: false,
    },
    token: {
        type: sequelize.Sequelize.STRING(255),
        allowNull: false,
    },
}, {  
    timestamps: false,
    freezeTableName: true 
});;

export default Usuario;
