import ContactSettings from '../models/ContactSettings.js'
import SocialLink from '../models/SocialLink.js'

const defaultSocialLinks = [
  ['LinkedIn', 'https://www.linkedin.com/company/dhvani-ai', 'Linkedin', 1],
  ['Facebook', 'https://www.facebook.com/', 'Facebook', 2],
  ['Instagram', 'https://www.instagram.com/', 'Instagram', 3],
  ['X / Twitter', 'https://x.com/', 'Twitter', 4],
  ['YouTube', 'https://www.youtube.com/', 'Youtube', 5],
  ['WhatsApp', 'https://wa.me/919876543210', 'MessageCircle', 6],
  ['Telegram', 'https://t.me/', 'Send', 7],
  ['GitHub', 'https://github.com/', 'Github', 8],
]

export async function seedSettings() {
  const contactCount = await ContactSettings.countDocuments()
  if (!contactCount) {
    await ContactSettings.create({
      email: 'hello@dhvani.ai',
      phone: '+91 98765 43210',
      address: 'Noida, Uttar Pradesh, India',
      googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Noida%2C%20Uttar%20Pradesh%2C%20India',
      supportEmail: 'hello@dhvani.ai',
      salesEmail: 'hello@dhvani.ai',
      updatedBy: 'system',
    })
  }

  await Promise.all(
    defaultSocialLinks.map(([platformName, profileUrl, iconName, sortOrder]) =>
      SocialLink.updateOne(
        { platformName },
        { $setOnInsert: { platformName, profileUrl, iconName, sortOrder, status: 'Active', createdBy: 'system', updatedBy: 'system' } },
        { upsert: true },
      ),
    ),
  )
}
