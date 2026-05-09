import User from '../models/User.js'

const defaultUsers = [
  { name: 'Admin', email: 'admin@dhvani.ai', role: 'Admin', password: 'Admin@12345' },
  { name: 'Manager', email: 'manager@dhvani.ai', role: 'Manager', password: 'Manager@12345' },
  { name: 'Vendor', email: 'vendor@dhvani.ai', role: 'Vendor', password: 'Vendor@12345' },
  { name: 'QC Team', email: 'qc@dhvani.ai', role: 'QC Team', password: 'QcTeam@12345' },
]

export async function seedUsers() {
  const syncDefaultPasswords = process.env.SYNC_DEFAULT_USER_PASSWORDS === 'true'

  for (const item of defaultUsers) {
    const existingUser = await User.findOne({ email: item.email }).select('+passwordHash +passwordSalt')

    if (existingUser) {
      existingUser.name = item.name
      existingUser.role = item.role
      existingUser.status = 'Active'
      existingUser.updatedBy = 'system'

      if (syncDefaultPasswords) {
        existingUser.setPassword(item.password)
      }

      await existingUser.save()
      continue
    }

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
  }

  const manager = await User.findOne({ email: 'manager@dhvani.ai' })
  const vendor = await User.findOne({ email: 'vendor@dhvani.ai' })
  const qcTeam = await User.findOne({ email: 'qc@dhvani.ai' })

  if (manager && vendor) {
    vendor.managerId = manager._id
    vendor.vendorId = null
    await vendor.save()
  }

  if (manager && vendor && qcTeam) {
    qcTeam.managerId = manager._id
    qcTeam.vendorId = vendor._id
    await qcTeam.save()
  }
}
