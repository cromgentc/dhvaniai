import express from 'express'
import { deleteApplication, getAllApplications, getApplicationById, updateApplicationStatus } from '../controllers/jobController.js'
import { requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/all', requireAdmin, getAllApplications)
router.get('/:id', requireAdmin, getApplicationById)
router.patch('/status/:id', requireAdmin, updateApplicationStatus)
router.delete('/delete/:id', requireAdmin, deleteApplication)

export default router
