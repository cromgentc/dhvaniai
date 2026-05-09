import User from '../models/User.js'

const defaultUsers = [
  { name: 'Admin', email: 'admin@dhvani.ai', role: 'Admin', password: 'Admin@12345' },
  { name: 'Manager', email: 'manager@dhvani.ai', role: 'Manager', password: 'Manager@12345' },
  { name: 'Vendor', email: 'vendor@dhvani.ai', role: 'Vendor', password: 'Vendor@12345' },
  { name: 'QC Team', email: 'qc@dhvani.ai', role: 'QC Team', password: 'QcTeam@12345' },
]

export async function seedUsers() {
  await Promise.all(
    defaultUsers.map(async (item) => {
      const exists = await User.findOne({ email: item.email })
      if (exists) return

      const user = new User({
        name: item.name,
        email: item.email,
        role: item.role,
        status: 'Active',
        createdBy: 'system',
        updatedBy: 'system',
      })
      user.setPassword(item.password)
      await user.save()
    }),
  )
}
