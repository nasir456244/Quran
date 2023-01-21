import admin from 'firebase-admin';
const firebaseCreds = require('../firebaseCreds.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCreds)
 })
}

const db = admin.firestore();

export { db };