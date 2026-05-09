import express from 'express'
import { getPublicContact, getPublicSocialLinks } from '../controllers/settingsController.js'

const router = express.Router()

router.get('/contact', getPublicContact)
router.get('/social-links', getPublicSocialLinks)

export default router
