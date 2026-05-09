import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Job title is required'], trim: true },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must use lowercase letters, numbers, and hyphens only'],
    },
    department: { type: String, required: [true, 'Department is required'], trim: true },
    location: { type: String, required: [true, 'Location is required'], trim: true },
    workMode: { type: String, enum: ['Remote', 'On-site', 'Hybrid'], default: 'On-site' },
    jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'], default: 'Full-time' },
    experienceLevel: { type: String, required: true, trim: true },
    minExperience: { type: Number, default: 0, min: 0 },
    maxExperience: { type: Number, default: 0, min: 0 },
    salaryMin: { type: Number, default: 0, min: 0 },
    salaryMax: { type: Number, default: 0, min: 0 },
    openings: { type: Number, default: 1, min: 1 },
    skills: [{ type: String, trim: true }],
    shortDescription: { type: String, required: true, trim: true, maxlength: 600 },
    fullDescription: { type: String, required: true, trim: true },
    responsibilities: { type: String, trim: true },
    requirements: { type: String, trim: true },
    education: { type: String, trim: true },
    benefits: { type: String, trim: true },
    applicationDeadline: { type: Date, required: true },
    status: { type: String, enum: ['Open', 'Closed', 'Draft', 'Urgent Hiring'], default: 'Draft' },
    postedBy: { type: String, default: 'admin', trim: true },
  },
  { timestamps: true },
)

jobSchema.index({ title: 'text', department: 'text', location: 'text', skills: 'text' })

const Job = mongoose.model('Job', jobSchema)

export default Job
