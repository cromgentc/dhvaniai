import express from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, updateUserStatus } from '../controllers/userController.js'
import { requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/create', requireAdmin, createUser)
router.get('/all', requireAdmin, getAllUsers)
router.get('/:id', requireAdmin, getUserById)
router.put('/update/:id', requireAdmin, updateUser)
router.patch('/status/:id', requireAdmin, updateUserStatus)
router.delete('/delete/:id', requireAdmin, deleteUser)

export default router
