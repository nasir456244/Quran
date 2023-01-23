import { db } from '../../lib/firebase-admin'
export default async function handler(req, res) {
    try {
        
        const quran = req.body
        Object?.values(quran)?.map(async (qur) => await db.collection('ar').doc(`chapter${qur?.chapter}`).set(qur))
        
        res.status(201).send('Succesfully added quran')
    }
    catch(err) {
        res.status(400).send(err?.message)
    }

}
