const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000

if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is required")
  process.exit(1)
}

if (!JWT_SECRET) {
  console.error("JWT_SECRET environment variable is required")
  process.exit(1)
}

module.exports = {
  JWT_SECRET,
  MONGODB_URI,
  PORT,
}
