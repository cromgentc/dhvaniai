import express from 'express'
import {
  applyToJob,
  createJob,
  deleteJob,
  getAllJobs,
  getJobBySlug,
  getOpenJobs,
  updateJob,
  updateJobStatus,
} from '../controllers/jobController.js'
import { requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/open', getOpenJobs)
router.post('/apply', applyToJob)
router.get('/all', requireAdmin, getAllJobs)
router.post('/create', requireAdmin, createJob)
router.put('/update/:id', requireAdmin, updateJob)
router.delete('/delete/:id', requireAdmin, deleteJob)
router.patch('/status/:id', requireAdmin, updateJobStatus)
router.get('/:slug', getJobBySlug)

export default router
