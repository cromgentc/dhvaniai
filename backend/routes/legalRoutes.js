import express from 'express'
import {
  createLegalPage,
  deleteLegalPage,
  getAllLegalPages,
  getLegalPageBySlug,
  updateLegalPage,
  updateLegalPageStatus,
} from '../controllers/legalController.js'
import { requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/create', requireAdmin, createLegalPage)
router.get('/all', requireAdmin, getAllLegalPages)
router.get('/:slug', getLegalPageBySlug)
router.put('/update/:id', requireAdmin, updateLegalPage)
router.delete('/delete/:id', requireAdmin, deleteLegalPage)
router.patch('/status/:id', requireAdmin, updateLegalPageStatus)

export default router
