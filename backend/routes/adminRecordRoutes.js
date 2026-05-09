import express from 'express'
import { createAdminRecord, deleteAdminRecord, getAdminRecords, updateAdminRecord } from '../controllers/adminRecordController.js'
import { requireAuthenticated } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/:module', requireAuthenticated, getAdminRecords)
router.post('/:module', requireAuthenticated, createAdminRecord)
router.put('/:module/:id', requireAuthenticated, updateAdminRecord)
router.delete('/:module/:id', requireAuthenticated, deleteAdminRecord)

export default router
