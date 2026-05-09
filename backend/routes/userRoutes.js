import express from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, updateUserStatus } from '../controllers/userController.js'
import { requireAuthenticated } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/create', requireAuthenticated, createUser)
router.get('/all', requireAuthenticated, getAllUsers)
router.get('/:id', requireAuthenticated, getUserById)
router.put('/update/:id', requireAuthenticated, updateUser)
router.patch('/status/:id', requireAuthenticated, updateUserStatus)
router.delete('/delete/:id', requireAuthenticated, deleteUser)

export default router
