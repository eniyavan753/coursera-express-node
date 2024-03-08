import {DataTypes} from "sequelize"
import {sequelize} from "../config/connection.js"

const Book = sequelize.define(
  "Book",
  {
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Add the following options for PostgreSQL:
    tableName: "books", // Specify the table name explicitly (optional)
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
    underscored: true, // Use snake_case for column names (optional)
  }
)

export default Book
