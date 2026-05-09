import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import adminSettingsRoutes from './routes/adminSettingsRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import legalRoutes from './routes/legalRoutes.js'
import leadRoutes from './routes/leadRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { seedJobs } from './utils/seedJobs.js'
import { seedLegalPages } from './utils/seedLegalPages.js'
import { seedSettings } from './utils/seedSettings.js'
import { seedUsers } from './utils/seedUsers.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(',') || '*',
    credentials: true,
  }),
)
app.use(express.json({ limit: '12mb' }))

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'dhvani-backend' })
})

app.use('/api/leads', leadRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/legal', legalRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/admin/settings', adminSettingsRoutes)
app.use('/api/users', userRoutes)

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' })
})

app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

connectDB()
  .then(async () => {
    await seedLegalPages()
    await seedJobs()
    await seedSettings()
    await seedUsers()
    app.listen(port, () => {
      console.log(`Dhvani backend running at http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
