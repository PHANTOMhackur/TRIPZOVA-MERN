const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDatabase = require('./config/database');

dotenv.config({ path: path.join(__dirname, '.env') });
const User = require('./models/User');

async function createAdmin() {
  const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || '');
  const firstName = process.env.ADMIN_FIRST_NAME || 'TRIPZOVA';
  const lastName = process.env.ADMIN_LAST_NAME || 'Admin';

  if (!email || password.length < 12) {
    throw new Error('Set ADMIN_EMAIL and a strong ADMIN_PASSWORD (12+ characters) in server/.env.');
  }

  await connectDatabase();
  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = 'admin';
    existing.accountStatus = 'active';
    existing.partnerStatus = 'not_applicable';
    if (existing.authProvider === 'local') existing.password = await bcrypt.hash(password, 12);
    await existing.save();
    console.log(`Admin updated: ${email}`);
  } else {
    await User.create({
      firstName, lastName, email,
      password: await bcrypt.hash(password, 12),
      authProvider: 'local', role: 'admin', accountStatus: 'active', partnerStatus: 'not_applicable',
    });
    console.log(`Admin created: ${email}`);
  }
  await mongoose.disconnect();
}

createAdmin().catch(async (error) => {
  console.error('Admin creation failed:', error.message);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
