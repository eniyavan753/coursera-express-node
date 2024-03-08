import {Sequelize} from "sequelize"
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres", // Change the dialect to 'postgres'
    port: process.env.DATABASE_PORT || 5432, // Specify the PostgreSQL port (default is 5432)
    // Additional options specific to PostgreSQL:
    // Uncomment the line below if you are using PostgreSQL and want to use SSL
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false,
    //     },
    // },
  }
)

export async function connectDB() {
  try {
    await sequelize.authenticate()
    console.log("Connected to the database!")
    // Uncomment the line below if you want to synchronize your models with the database
    // await sequelize.sync();
  } catch (error) {
    console.error("Failed connecting to the database", {message: error.message})
  }
}
