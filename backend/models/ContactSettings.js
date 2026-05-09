import mongoose from 'mongoose'

const contactSettingsSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Valid company email is required'] },
    phone: { type: String, required: true, trim: true, match: [/^[0-9+\-\s()]{7,20}$/, 'Valid phone number is required'] },
    address: { type: String, required: true, trim: true },
    googleMapUrl: { type: String, trim: true },
    supportEmail: { type: String, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$|^$/, 'Valid support email is required'] },
    salesEmail: { type: String, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$|^$/, 'Valid sales email is required'] },
    updatedBy: { type: String, default: 'admin', trim: true },
  },
  { timestamps: true },
)

const ContactSettings = mongoose.model('ContactSettings', contactSettingsSchema)

export default ContactSettings
