import mongoose from 'mongoose'

const legalPageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Page title is required'],
      trim: true,
      minlength: [2, 'Page title is too short'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must use lowercase letters, numbers, and hyphens only'],
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [500, 'Short description is too long'],
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [120, 'SEO title is too long'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [320, 'Meta description is too long'],
    },
    content: {
      type: String,
      required: [true, 'Page content is required'],
      trim: true,
      minlength: [10, 'Page content is too short'],
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    createdBy: {
      type: String,
      default: 'admin',
      trim: true,
    },
    updatedBy: {
      type: String,
      default: 'admin',
      trim: true,
    },
  },
  { timestamps: true },
)

legalPageSchema.index({ title: 'text', slug: 'text', shortDescription: 'text', seoTitle: 'text' })

const LegalPage = mongoose.model('LegalPage', legalPageSchema)

export default LegalPage
