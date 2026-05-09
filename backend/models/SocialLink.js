import mongoose from 'mongoose'

const socialLinkSchema = new mongoose.Schema(
  {
    platformName: { type: String, required: true, trim: true },
    profileUrl: { type: String, required: true, trim: true, match: [/^https?:\/\/.+/i, 'Valid profile URL is required'] },
    iconName: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    sortOrder: { type: Number, default: 0 },
    createdBy: { type: String, default: 'admin', trim: true },
    updatedBy: { type: String, default: 'admin', trim: true },
  },
  { timestamps: true },
)

socialLinkSchema.index({ platformName: 1 }, { unique: true })

const SocialLink = mongoose.model('SocialLink', socialLinkSchema)

export default SocialLink
