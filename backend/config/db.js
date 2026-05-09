import mongoose from 'mongoose'

const fallbackMongoUri = 'mongodb://127.0.0.1:27017/dhvani'

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || fallbackMongoUri

  if (mongoUri.includes('<db_password>')) {
    throw new Error('Please replace <db_password> in backend/.env MONGODB_URI with your actual MongoDB Atlas password.')
  }

  const connection = await mongoose.connect(mongoUri)
  console.log(`MongoDB connected: ${connection.connection.host}/${connection.connection.name}`)
  return connection
}

export default connectDB
