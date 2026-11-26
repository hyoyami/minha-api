import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false
})

export async function connectToDatabase() {
    try {
        console.log("se conectando ao banco de dados!")
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("Banco de dados conectado com sucesso!")
    } catch (error) {
        console.log("Erro ao conectar no banco", error.message)
        throw error
    }
}
