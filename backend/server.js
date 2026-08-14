require("dotenv").config()
require("./src/config/env")

const app = require("./src/app")
const connectDB = require("./src/config/db")
const { PORT } = require("./src/config/env")

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

if (require.main === module) {
  startServer().catch((err) => {
    console.error("Failed to start server:", err.message)
    process.exit(1)
  })
}

module.exports = app
