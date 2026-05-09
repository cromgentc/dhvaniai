import mongoose from 'mongoose'

const adminRecordSchema = new mongoose.Schema(
  {
    module: { type: String, required: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    emailOrId: { type: String, default: '', trim: true },
    role: { type: String, default: 'Vendor', trim: true },
    project: { type: String, default: '', trim: true },
    language: { type: String, default: '', trim: true },
    status: { type: String, enum: ['Active', 'Pending', 'Approved', 'Rejected', 'Inactive'], default: 'Active' },
    score: { type: String, default: '', trim: true },
    notes: { type: String, default: '', trim: true },
    createdBy: { type: String, default: 'system', trim: true },
    updatedBy: { type: String, default: 'system', trim: true },
  },
  { timestamps: true },
)

const AdminRecord = mongoose.model('AdminRecord', adminRecordSchema)

export default AdminRecord
