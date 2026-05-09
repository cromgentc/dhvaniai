import express from 'express'
import { createLead, deleteLead, getAllLeads, getLeadById, updateLeadStatus } from '../controllers/leadController.js'

const router = express.Router()

router.post('/create', createLead)
router.get('/all', getAllLeads)
router.get('/:id', getLeadById)
router.patch('/:id/status', updateLeadStatus)
router.delete('/:id', deleteLead)

export default router
