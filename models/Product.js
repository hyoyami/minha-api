import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Product = sequelize.define(
    "Product",
    {
        titulo: { type: DataTypes.STRING, allowNull: false },
        autor: { type: DataTypes.STRING, allowNull: false },
        categoria: { type: DataTypes.ENUM("livro", "manga"), allowNull: false },
        genero: { type: DataTypes.STRING, allowNull: false },
        anoPublicacao: { type: DataTypes.INTEGER },
        volume: { type: DataTypes.INTEGER },
        preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0 } },
        estoque: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } }
    },
    {
        tableName: "produtos",
        indexes: [{ unique: true, fields: ["titulo", "categoria"] }]
    }
)
