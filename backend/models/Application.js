import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    jobTitle: { type: String, required: true, trim: true },
    fullName: { type: String, required: [true, 'Full name is required'], trim: true, minlength: 2 },
    email: { type: String, required: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Valid email is required'] },
    mobile: { type: String, required: true, trim: true, match: [/^[0-9+\-\s()]{7,20}$/, 'Valid mobile number is required'] },
    currentLocation: { type: String, required: true, trim: true },
    totalExperience: { type: String, required: true, trim: true },
    relevantExperience: { type: String, trim: true },
    currentCompany: { type: String, trim: true },
    currentCTC: { type: String, trim: true },
    expectedCTC: { type: String, trim: true },
    noticePeriod: { type: String, trim: true },
    resumeUrl: { type: String, required: [true, 'Resume is required'] },
    linkedinUrl: { type: String, trim: true },
    portfolioUrl: { type: String, trim: true },
    coverLetter: { type: String, trim: true, maxlength: 3000 },
    consent: {
      type: Boolean,
      required: true,
      validate: { validator: (value) => value === true, message: 'Consent is required' },
    },
    status: { type: String, enum: ['New', 'Shortlisted', 'Interview', 'Selected', 'Rejected'], default: 'New' },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

applicationSchema.index({ jobId: 1, email: 1 }, { unique: true })

const Application = mongoose.model('Application', applicationSchema)

export default Application
