import conn from "../config/conn.js";
import { DataTypes } from "sequelize";

const Usuarios = conn.define("usuarios", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,   
        required: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
},
{
    tableName: "usuarios",
}
);

export default Usuarios