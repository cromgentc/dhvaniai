import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name is too short'],
    },
    registrationType: {
      type: String,
      enum: ['enterprise', 'vendor', 'freelancer'],
      default: 'enterprise',
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^[0-9+\-\s()]{7,20}$/, 'Please enter a valid mobile number'],
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    service: {
      type: String,
      required: [true, 'Service interested in is required'],
      trim: true,
    },
    budget: {
      type: String,
      required: [true, 'Project budget is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message is too long'],
    },
    consent: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: 'Consent is required before submitting the lead',
      },
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Converted', 'Rejected'],
      default: 'New',
    },
    source: {
      type: String,
      default: 'Website Contact Modal',
      trim: true,
    },
  },
  { timestamps: true },
)

leadSchema.index({ email: 1, mobile: 1, service: 1 }, { unique: true })

const Lead = mongoose.model('Lead', leadSchema)

export default Lead
