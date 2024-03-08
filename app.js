// app.js

import Express from "express"
import dotenv from "dotenv"
import cors from "cors"
import prisma from "./prisma/prisma.js"
import notFoundHandler from "./middleware/not-found.js"

dotenv.config()

const app = Express()
app.use(cors())

// middleware
app.use(Express.json())

// routes
import authRoutes from "./routes/auth.js"
import bookRoutes from "./routes/book.js"
import reviewRoutes from "./routes/review.js"

app.use("/api", authRoutes)
app.use("/api", bookRoutes)
app.use("/api", reviewRoutes)

// error handlers
app.use(notFoundHandler)

try {
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
  })
} catch (error) {
  console.log(error)
}
