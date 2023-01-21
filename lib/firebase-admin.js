import admin from 'firebase-admin';
const firebaseCreds = require('../firebaseCreds.json')

const creds =  {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY      
  }


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.environment === prod ? creds : firebaseCreds)
 })
}

const db = admin.firestore();

export { db };