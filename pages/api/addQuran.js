import { db } from '../../lib/firebase-admin'
export default async function handler(req, res) {
    try {
        
        const quran = req.body
        console.log(quran)
        await db.collection('en').doc('chapter1').set(quran)
        
        res.status(201).send('Succesfully added quran')
    }
    catch(err) {
        res.status(400).send(err?.message)
    }

}
