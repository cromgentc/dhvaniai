import mongoose from 'mongoose'
import { hashPassword, verifyPassword } from '../utils/password.js'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Valid email is required'] },
    role: { type: String, enum: ['Admin', 'Manager', 'Vendor', 'QC Team'], required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    passwordHash: { type: String, required: true, select: false },
    passwordSalt: { type: String, required: true, select: false },
    createdBy: { type: String, default: 'system', trim: true },
    updatedBy: { type: String, default: 'system', trim: true },
  },
  { timestamps: true },
)

userSchema.methods.setPassword = function setPassword(password) {
  const { passwordHash, passwordSalt } = hashPassword(password)
  this.passwordHash = passwordHash
  this.passwordSalt = passwordSalt
}

userSchema.methods.verifyPassword = function checkPassword(password) {
  return verifyPassword(password, this.passwordHash, this.passwordSalt)
}

const User = mongoose.model('User', userSchema)

export default User
