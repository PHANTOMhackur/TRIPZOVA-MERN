const mongoose = require('mongoose');
require('dotenv').config();

const SOURCE = process.env.LEGACY_MONGO_URI;
const TARGET = process.env.MONGO_URI;
const COLLECTIONS = ['users', 'partnerprofiles', 'vehicles', 'bookings', 'vehiclereservations', 'contactmessages'];

async function migrate() {
  if (!SOURCE || !TARGET) throw new Error('Set LEGACY_MONGO_URI and MONGO_URI before running migration.');
  if (SOURCE === TARGET) {
    console.log('Source and target MongoDB are identical; no migration is required.');
    return;
  }
  const source = mongoose.createConnection(SOURCE);
  const target = mongoose.createConnection(TARGET);
  await Promise.all([source.asPromise(), target.asPromise()]);
  for (const name of COLLECTIONS) {
    const docs = await source.collection(name).find({}).toArray();
    if (!docs.length) { console.log(`${name}: 0 documents`); continue; }
    await target.collection(name).deleteMany({});
    await target.collection(name).insertMany(docs, { ordered: false });
    console.log(`${name}: migrated ${docs.length}`);
  }
  await Promise.all([source.close(), target.close()]);
}

migrate().catch((error) => { console.error(error); process.exit(1); });
