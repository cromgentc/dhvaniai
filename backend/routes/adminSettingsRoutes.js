import express from 'express'
import {
  createSocialLink,
  deleteSocialLink,
  getAdminSocialLinks,
  updateContact,
  updateSocialLink,
  updateSocialLinkStatus,
} from '../controllers/settingsController.js'
import { requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.put('/contact', requireAdmin, updateContact)
router.get('/social-links', requireAdmin, getAdminSocialLinks)
router.post('/social-links', requireAdmin, createSocialLink)
router.put('/social-links/:id', requireAdmin, updateSocialLink)
router.delete('/social-links/:id', requireAdmin, deleteSocialLink)
router.patch('/social-links/:id/status', requireAdmin, updateSocialLinkStatus)

export default router
