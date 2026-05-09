import express from 'express'
import { getDashboardSummary } from '../controllers/dashboardController.js'
import { requireAuthenticated } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/summary', requireAuthenticated, getDashboardSummary)

export default router
